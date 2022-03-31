import { IException } from 'src/domain/exceptions/exceptions.interface';
import { CommentRepository } from 'src/domain/repositories/comment.repository';
import { VideoRepository } from 'src/domain/repositories/video.repository';

export class CommentAdoptionUsecase {
  constructor(
    private readonly commentRepository: CommentRepository,
    private readonly videoRepository: VideoRepository,
    private readonly exceptionsService: IException,
  ) {}

  async execute(commentId: number, userId: number, videoId: number) {
    const comment = await this.commentRepository.findOne(commentId);
    const video = await this.videoRepository.findUsersQuestion(videoId, userId);

    if (video.question != null) {
      this.exceptionsService.itIsNotQuestionException();
    }

    if (!comment) this.exceptionsService.commentNotFoundException();
    if (comment.isAdoption) this.exceptionsService.adoptionAlreadyExistException();

    this.commentRepository.commentAdoption(commentId);
  }
}
