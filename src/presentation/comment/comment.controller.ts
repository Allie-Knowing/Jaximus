import { Controller, Inject, Param, ParseIntPipe, Put } from '@nestjs/common';
import { CommentAdoptionUsecase } from 'src/usecase/comment/comment-adoption';

@Controller('/comment')
export class CommentController {
  constructor(@Inject(CommentAdoptionUsecase) private readonly commentAdoptionUsecase: CommentAdoptionUsecase) {}

  @Put('/adoption/:commentId')
  async videoAdoption(@Param('commentId', ParseIntPipe) commentId: number) {
    await this.commentAdoptionUsecase.execute(commentId);
    return { status: 200, message: 'success' };
  }
}
