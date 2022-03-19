import { Body, Controller, Inject, Post } from '@nestjs/common';
import { CreateLikeUsecase } from 'src/usecase/like/create-like';

@Controller('/like')
export class LikeController {
  constructor(@Inject(CreateLikeUsecase) private readonly createLikeUsecase: CreateLikeUsecase) {}

  @Post('/')
  async createLike(@Body() videoId: number) {
    this.createLikeUsecase.execute(videoId);
  }
}
