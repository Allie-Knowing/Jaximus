import { Body, Controller, Inject, Post, Scope, UseGuards } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import { IUserReqeust } from 'src/domain/interfaces/request.interface';
import { CreateLikeUsecase } from 'src/usecase/like/create-like';

@Controller({ path: '/like', scope: Scope.REQUEST })
export class LikeController {
  constructor(
    @Inject(CreateLikeUsecase) private readonly createLikeUsecase: CreateLikeUsecase,
    @Inject(REQUEST)
    private readonly request: IUserReqeust,
  ) {}

  @UseGuards(AuthGuard('jwt'))
  @Post('/')
  async createLike(@Body('videoId') videoId: number) {
    const userId = this.request.user.userId;
    this.createLikeUsecase.execute(videoId, userId);
  }
}
