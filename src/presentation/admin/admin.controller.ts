import { Controller, Delete, HttpCode, HttpStatus, Param, ParseIntPipe, Query, Scope } from '@nestjs/common';
import { AdminDeleteCommentUsecase } from 'src/usecase/admin/admin-delete-comment';
import { AdminDeleteVideoUsecase } from 'src/usecase/admin/admin-delete-video';

@Controller({ path: '/admin', scope: Scope.REQUEST })
export class AdminController {
  constructor(
    private readonly adminDeleteVideoUsecase: AdminDeleteVideoUsecase,
    private readonly adminDeleteCommentUsecase: AdminDeleteCommentUsecase,
  ) {}

  @Delete('/video/:videoId')
  @HttpCode(HttpStatus.NO_CONTENT)
  deleteVideo(@Param('videoId', ParseIntPipe) videoId: number, @Query('reportId', ParseIntPipe) reportId: number) {
    return this.adminDeleteVideoUsecase.execute(videoId, reportId);
  }

  @Delete('/comment/:commentId')
  @HttpCode(HttpStatus.NO_CONTENT)
  deleteComment(@Param('commentId', ParseIntPipe) commentId: number, @Query('reportId', ParseIntPipe) reportId: number) {
    return this.adminDeleteCommentUsecase.execute(commentId, reportId);
  }
}
