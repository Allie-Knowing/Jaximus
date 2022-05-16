import { Controller, Inject, Param, ParseIntPipe, Patch, Post, Scope, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { FileInterceptor } from '@nestjs/platform-express';
import { VideoViewsUsecase } from 'src/usecase/video/video-views';

@Controller({ path: '/video', scope: Scope.REQUEST })
export class VideoController {
  constructor(
    @Inject(VideoViewsUsecase)
    private readonly videoViewsUsecase: VideoViewsUsecase,
  ) {}

  @UseGuards(AuthGuard('jwt'))
  @Post('/file')
  @UseInterceptors(FileInterceptor('file'))
  videoFile(@UploadedFile() file) {
    return { url: file ? file.location : null };
  }

  @Patch('/views/:videoId')
  videoViews(@Param('videoId', ParseIntPipe) videoId: number): Promise<void> {
    return this.videoViewsUsecase.execute(videoId);
  }
}
