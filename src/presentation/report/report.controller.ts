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
import { CreateVideoReportDto } from './report.dto';
import { IUserRequest } from 'src/domain/interfaces/request.interface';
import { AuthGuard } from '@nestjs/passport';

@Controller({ path: '/admin/report', scope: Scope.REQUEST })
export class ReportController {
  constructor(
    @Inject(QueryReportListUsecase)
    private readonly queryReportListUsecase: QueryReportListUsecase,
    @Inject(CreateVideoReportUsecase)
    private readonly createVideoReportUsecase: CreateVideoReportUsecase,
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

  @Post('/comment')
  reportComment(@Body() dto) {
    throw new BadRequestException('method not implemented!');
  }

  @Delete('/:reportId')
  reportPass(@Param('reportId') reportId: number) {
    throw new BadRequestException('method not implemented!');
  }
}
