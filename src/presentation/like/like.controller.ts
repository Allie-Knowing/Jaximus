import { Body, Controller, Delete, Inject, Post, Scope, UseGuards } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import { IUserReqeust } from 'src/domain/interfaces/request.interface';
import { CreateLikeUsecase } from 'src/usecase/like/create-like';
import { DeleteLikeUsecase } from 'src/usecase/like/delete-like';

@Controller({ path: '/like', scope: Scope.REQUEST })
export class LikeController {
  constructor(
    @Inject(CreateLikeUsecase) private readonly createLikeUsecase: CreateLikeUsecase,
    @Inject(DeleteLikeUsecase) private readonly deleteLikeUsecase: DeleteLikeUsecase,
    @Inject(REQUEST)
    private readonly request: IUserReqeust,
  ) {}

  @UseGuards(AuthGuard('jwt'))
  @Post('/')
  async createLike(@Body('videoId') videoId: number) {
    const userId = this.request.user.userId;
    await this.createLikeUsecase.execute(videoId, userId);
    return { status: 201, message: 'success' };
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete('/')
  async deleteLike(@Body('videoId') videoId: number) {
    const userId = this.request.user.userId;
    await this.deleteLikeUsecase.execute(videoId, userId);
    return { status: 200, message: 'success' };
  }
}
