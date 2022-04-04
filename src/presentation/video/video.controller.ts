import { Controller, Post, Scope, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller({ path: '/video', scope: Scope.REQUEST })
export class VideoController {
  constructor() {}

  @Post('/file')
  @UseInterceptors(FileInterceptor('file'))
  videoFile(@UploadedFile() file) {
    return { url: file ? file.location : null };
  }
}
