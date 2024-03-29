import { IException } from 'src/domain/exceptions/exceptions.interface';
import { CommentRepository } from 'src/domain/repositories/comment.repository';
import { VideoRepository } from 'src/domain/repositories/video.repository';
import { ExpoPushMessage } from 'expo-server-sdk';
import { ExpoService } from 'src/infrastructure/config/expo/expo.service';
import { UserRepository } from 'src/domain/repositories/user.repository';

export class CreateTextAnswerUsecase {
  constructor(
    private readonly expoService: ExpoService,
    private readonly userRepository: UserRepository,
    private readonly commentRepository: CommentRepository,
    private readonly videoRepository: VideoRepository,
    private readonly exceptionsService: IException,
  ) {}

  async execute(content: string, questionId: number, userId: number) {
    const question: any = await this.videoRepository.findOne(questionId);
    const user = await this.userRepository.findOne(userId);
    const videoOwner = await this.userRepository.findOne(question.user.id);
    if (!question) this.exceptionsService.questionNotFoundException();

    this.commentRepository.createCommentAnswer(content, questionId, userId);

    let messages: ExpoPushMessage[] = [
      {
        to: videoOwner.expoToken,
        sound: 'default',
        title: `${user.name}님이 글 답변을 달았습니다!`,
        body: `${content}`,
      },
    ];
    this.expoService.sendPushNotification(messages);
  }
}
