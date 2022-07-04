import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Inject,
  Param,
  Post,
  Scope,
  UseGuards,
} from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { CreateVideoReportUsecase } from 'src/usecase/report/create-video-report';
import { QueryReportListUsecase } from 'src/usecase/report/query-report-list';
import { CreateCommentReportDto, CreateVideoReportDto } from './report.dto';
import { IUserRequest } from 'src/domain/interfaces/request.interface';
import { AuthGuard } from '@nestjs/passport';
import { CreateCommentReportUsecase } from 'src/usecase/report/create-comment-report';

@Controller({ path: '/admin/report', scope: Scope.REQUEST })
export class ReportController {
  constructor(
    @Inject(QueryReportListUsecase)
    private readonly queryReportListUsecase: QueryReportListUsecase,
    @Inject(CreateVideoReportUsecase)
    private readonly createVideoReportUsecase: CreateVideoReportUsecase,
    @Inject(CreateCommentReportUsecase)
    private readonly createCommentReportUsecase: CreateCommentReportUsecase,
    @Inject(REQUEST)
    private readonly request: IUserRequest,
  ) {}

  @Get()
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
  reportComment(@Body() dto: CreateCommentReportDto) {
    return this.createCommentReportUsecase.execute(dto, this.request.user.sub);
  }

  @Delete('/:reportId')
  reportPass(@Param('reportId') reportId: number) {
    throw new BadRequestException('method not implemented!');
  }
}
