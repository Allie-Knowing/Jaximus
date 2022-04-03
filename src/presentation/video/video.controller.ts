import {
  Controller,
  Inject,
  Post,
  Param,
  ParseIntPipe,
  Scope,
  UploadedFile,
  UseInterceptors,
  Put,
  HttpStatus,
  HttpCode,
  UseGuards,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { VideoAdoptionUsecase } from 'src/usecase/video/video-adoption';
import { IUserReqeust } from 'src/domain/interfaces/request.interface';
import { REQUEST } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';

@Controller({ path: '/video', scope: Scope.REQUEST })
export class VideoController {
  constructor(
    @Inject(VideoAdoptionUsecase)
    private readonly videoAdoptionUsecase: VideoAdoptionUsecase,
    @Inject(REQUEST)
    private readonly request: IUserReqeust,
  ) {}

  @Post('/file')
  @UseInterceptors(FileInterceptor('file'))
  videoFile(@UploadedFile() file) {
    return { url: file ? file.location : null };
  }

  @UseGuards(AuthGuard('jwt'))
  @Put('/adoption/:videoId')
  @HttpCode(HttpStatus.OK)
  async videoAdoption(@Param('videoId', ParseIntPipe) videoId: number) {
    const userId = this.request.user.sub;
    await this.videoAdoptionUsecase.execute(videoId, userId);
  }
}
