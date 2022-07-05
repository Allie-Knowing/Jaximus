import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Inject, Param, Post, Scope, UseGuards } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { CreateVideoReportUsecase } from 'src/usecase/report/create-video-report';
import { QueryReportListUsecase } from 'src/usecase/report/query-report-list';
import { CreateCommentReportDto, CreateVideoReportDto } from './report.dto';
import { IUserRequest } from 'src/domain/interfaces/request.interface';
import { AuthGuard } from '@nestjs/passport';
import { CreateCommentReportUsecase } from 'src/usecase/report/create-comment-report';
import { DeleteReportUsecase } from 'src/usecase/report/delete-report';

@Controller({ path: '/admin/report', scope: Scope.REQUEST })
export class ReportController {
  constructor(
    @Inject(QueryReportListUsecase)
    private readonly queryReportListUsecase: QueryReportListUsecase,
    @Inject(CreateVideoReportUsecase)
    private readonly createVideoReportUsecase: CreateVideoReportUsecase,
    @Inject(CreateCommentReportUsecase)
    private readonly createCommentReportUsecase: CreateCommentReportUsecase,
    @Inject(DeleteReportUsecase)
    private readonly deleteReportUsecase: DeleteReportUsecase,
    @Inject(REQUEST)
    private readonly request: IUserRequest,
  ) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  reportList() {
    return this.queryReportListUsecase.execute();
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('/video')
  @HttpCode(HttpStatus.CREATED)
  videoReport(@Body() dto: CreateVideoReportDto) {
    return this.createVideoReportUsecase.execute(dto, this.request.user.sub);
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('/comment')
  @HttpCode(HttpStatus.CREATED)
  reportComment(@Body() dto: CreateCommentReportDto) {
    return this.createCommentReportUsecase.execute(dto, this.request.user.sub);
  }

  @Delete('/:reportId')
  @HttpCode(HttpStatus.NO_CONTENT)
  reportPass(@Param('reportId') reportId: number) {
    return this.deleteReportUsecase.execute(reportId);
  }
}
