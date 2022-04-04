import { Controller, Post, Scope, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller({ path: '/video', scope: Scope.REQUEST })
export class VideoController {
  constructor() {}

  @UseGuards(AuthGuard('jwt'))
  @Post('/file')
  @UseInterceptors(FileInterceptor('file'))
  videoFile(@UploadedFile() file) {
    console.log("2:   ", file);
    
    return { url: file ? file.location : null };
  }
}
