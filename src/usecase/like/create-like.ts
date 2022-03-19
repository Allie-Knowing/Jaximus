import { Inject, Injectable, Scope } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { IException } from 'src/domain/exceptions/exceptions.interface';
import { IUserReqeust } from 'src/domain/interfaces/request.interface';
import { LikeRepository } from 'src/domain/repositories/like.repository';

@Injectable({ scope: Scope.REQUEST })
export class CreateLikeUsecase {
  constructor(
    private readonly likeRepository: LikeRepository,
    private readonly exceptionsService: IException,
    @Inject(REQUEST)
    private readonly request: IUserReqeust,
  ) {}

  async execute(videoId: number) {
    const userId = this.request.user.userId;
    const checkTheLike = await this.likeRepository.findOne({ video_id: videoId, user_id: userId });
    if (checkTheLike) this.exceptionsService.likesAlreadyExistException();

    this.likeRepository.createLike(videoId, userId);
  }
}
