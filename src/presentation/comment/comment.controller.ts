import { Body, Controller, HttpCode, HttpStatus, Inject, Param, ParseIntPipe, Put, Scope, UseGuards } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import { IUserReqeust } from 'src/domain/interfaces/request.interface';
import { CommentAdoptionUsecase } from 'src/usecase/comment/comment-adoption';

@Controller({ path: '/comment', scope: Scope.REQUEST })
export class CommentController {
  constructor(
    @Inject(CommentAdoptionUsecase) private readonly commentAdoptionUsecase: CommentAdoptionUsecase,
    @Inject(REQUEST)
    private readonly request: IUserReqeust,
  ) {}

  @UseGuards(AuthGuard('jwt'))
  @Put('/adoption/:commentId')
  @HttpCode(HttpStatus.OK)
  async videoAdoption(@Param('commentId', ParseIntPipe) commentId: number, @Body('videoId') videoId: number) {
    const userId = this.request.user.sub;
    await this.commentAdoptionUsecase.execute(commentId, userId, videoId);
  }
}
