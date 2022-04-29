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
    const question = await this.videoRepository.findUsersQuestion(videoId, userId);

    if (!question) {
      this.exceptionsService.questionNotFoundException();
    }

    if (!comment) this.exceptionsService.commentNotFoundException();
    if (comment.isAdoption) this.exceptionsService.adoptionAlreadyExistException();

    const checkAdoption = await this.videoRepository.checkAdoption(videoId);

    if (checkAdoption !== 0) this.exceptionsService.questionIsAlreadyAdoptedException();

    this.commentRepository.commentAdoption(commentId, comment.userId);
  }
}
