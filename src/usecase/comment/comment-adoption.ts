import { IException } from 'src/domain/exceptions/exceptions.interface';
import { CommentRepository } from 'src/domain/repositories/comment.repository';

export class CommentAdoptionUsecase {
  constructor(private readonly commentRepository: CommentRepository, private readonly exceptionsService: IException) {}

  async execute(commentId: number) {
    const comment = await this.commentRepository.findOne(commentId);

    if (!comment) this.exceptionsService.commentNotFoundException();
    if (comment.isAdoption) this.exceptionsService.adoptionAlreadyExistException();

    console.log('응애');
    this.commentRepository.commentAdoption(commentId);
  }
}
