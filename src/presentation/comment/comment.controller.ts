import { Controller, HttpCode, HttpStatus, Inject, Param, ParseIntPipe, Put } from '@nestjs/common';
import { CommentAdoptionUsecase } from 'src/usecase/comment/comment-adoption';

@Controller('/comment')
export class CommentController {
  constructor(@Inject(CommentAdoptionUsecase) private readonly commentAdoptionUsecase: CommentAdoptionUsecase) {}

  @Put('/adoption/:commentId')
  @HttpCode(HttpStatus.OK)
  async videoAdoption(@Param('commentId', ParseIntPipe) commentId: number) {
    await this.commentAdoptionUsecase.execute(commentId);
  }
}
