import Expo, { ExpoPushMessage } from 'expo-server-sdk';
import { CacheTemplate, generateCacheTemplate } from 'src/domain/enums/cache.enum';
import { IException } from 'src/domain/exceptions/exceptions.interface';
import { Like } from 'src/domain/model/like';
import { User } from 'src/domain/model/user';
import { ActionPointRepository } from 'src/domain/repositories/action-point.repository';
import { LikeRepository } from 'src/domain/repositories/like.repository';
import { UserRepository } from 'src/domain/repositories/user.repository';
import { VideoRepository } from 'src/domain/repositories/video.repository';
import { RedisCacheService } from 'src/infrastructure/config/redis/redis-cache.service';

export class CreateLikeUsecase {
  client: Expo;

  constructor(
    private readonly cacheService: RedisCacheService,
    private readonly likeRepository: LikeRepository,
    private readonly userRepository: UserRepository,
    private readonly videoRepository: VideoRepository,
    private readonly actionPointRepository: ActionPointRepository,
    private readonly exceptionsService: IException,
  ) {}

  async execute(videoId: number, userId: number) {
    const like: Like = await this.likeRepository.findOne(videoId, userId);

    if (like) this.exceptionsService.likesAlreadyExistException();

    const user: User = await this.userRepository.findOne(userId);
    const video: any = await this.videoRepository.findOne(videoId);
    const videoOwner: User = await this.userRepository.findOne(video.user.id);

    await this.likeRepository.save(user, video);

    // action point 관련
    const likeTemplateKey = generateCacheTemplate(CacheTemplate.ACTION_LIKE, userId);

    const cachedLikeCnt = await this.cacheService.get(likeTemplateKey);

    if (!cachedLikeCnt) await this.cacheService.set(likeTemplateKey, 1);
    else await this.cacheService.set(likeTemplateKey, cachedLikeCnt + 1);

    if ((cachedLikeCnt + 1) % 10 == 0 && cachedLikeCnt + 1) {
      const actionLikeCheck = await this.cacheService.get(generateCacheTemplate(CacheTemplate.ACTION_LIKE_CHECK, userId));
      let tmp = !actionLikeCheck ? 0 : actionLikeCheck;
      if (cachedLikeCnt + 1 > tmp) {
        await this.actionPointRepository.saveActionPoint(user, 5);
        await this.cacheService.set(generateCacheTemplate(CacheTemplate.ACTION_LIKE_CHECK, userId), cachedLikeCnt + 1);
      }
    }

    // Notification
    if (!Expo.isExpoPushToken(user.expoToken)) {
      console.error(`Push token ${user.expoToken} is not a valid Expo push token`);
      return;
    }
    let messages: ExpoPushMessage[] = [
      {
        to: videoOwner.expoToken,
        sound: 'default',
        title: `${video.title} 영상의 좋아요가 추가되었습니다.`,
        body: ` ${user.name}님이 좋아요를 눌렀습니다!`,
      },
    ];
    let chunks = this.client.chunkPushNotifications(messages);
    for (let chunk of chunks) {
      try {
        let ticketChunk = await this.client.sendPushNotificationsAsync(chunk);
        console.log(ticketChunk);
      } catch (error) {
        console.error(error);
      }
    }
  }
}
