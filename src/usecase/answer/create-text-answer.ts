import { IException } from 'src/domain/exceptions/exceptions.interface';
import { CommentRepository } from 'src/domain/repositories/comment.repository';
import { VideoRepository } from 'src/domain/repositories/video.repository';
import { Expo, ExpoPushMessage } from 'expo-server-sdk';
import { ExpoService } from 'src/infrastructure/config/expo/expo.service';
import { UserRepository } from 'src/domain/repositories/user.repository';

export class CreateTextAnswerUsecase {
  client: Expo;

  constructor(
    private readonly expoService: ExpoService,
    private readonly userRepository: UserRepository,
    private readonly commentRepository: CommentRepository,
    private readonly videoRepository: VideoRepository,
    private readonly exceptionsService: IException,
  ) {}

  async execute(content: string, questionId: number, userId: number) {
    const question = await this.videoRepository.findOne(questionId);
    const owner = await this.videoRepository.findVideoOwnerId(questionId);
    const user = await this.userRepository.findOne(userId);
    const videoOwner = await this.userRepository.findOne(owner.id);
    console.log(question);
    console.log('이건 유저');
    console.log(user);
    console.log('이건 비디오 오너');
    console.log(videoOwner);
    if (!question) this.exceptionsService.questionNotFoundException();

    this.commentRepository.createCommentAnswer(content, questionId, userId);

    if (this.client === undefined) {
      this.client = this.expoService.getExpoServerClient();
    }

    if (!Expo.isExpoPushToken(user.expoToken)) {
      console.error(`Push token ${user.expoToken} is not a valid Expo push token`);
      return;
    }
    let messages: ExpoPushMessage[] = [
      {
        to: videoOwner.expoToken,
        sound: 'default',
        title: `${user.name}님이 글 답변을 달았습니다!`,
        body: `${content}`,
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
