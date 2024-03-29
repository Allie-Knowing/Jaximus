import { Body, Controller, Delete, HttpCode, HttpStatus, Inject, Post, Scope, UseGuards } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import { IUserRequest } from 'src/domain/interfaces/request.interface';
import { CreateLikeUsecase } from 'src/usecase/like/create-like';
import { DeleteLikeUsecase } from 'src/usecase/like/delete-like';

@Controller({ path: '/like', scope: Scope.REQUEST })
export class LikeController {
  constructor(
    @Inject(CreateLikeUsecase) private readonly createLikeUsecase: CreateLikeUsecase,
    @Inject(DeleteLikeUsecase) private readonly deleteLikeUsecase: DeleteLikeUsecase,
    @Inject(REQUEST)
    private readonly request: IUserRequest,
  ) {}

  @UseGuards(AuthGuard('jwt'))
  @Post('/')
  @HttpCode(HttpStatus.CREATED)
  async createLike(@Body('videoId') videoId: number) {
    await this.createLikeUsecase.execute(videoId, this.request.user.sub);
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete('/')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteLike(@Body('videoId') videoId: number) {
    await this.deleteLikeUsecase.execute(videoId, this.request.user.sub);
  }
}
