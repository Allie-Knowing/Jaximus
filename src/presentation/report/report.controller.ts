import { BadRequestException, Body, Controller, Delete, Get, Inject, Param, Post, Scope } from '@nestjs/common';
import { QueryReportListUsecase } from 'src/usecase/report/query-report-list';

@Controller({ path: '/admin/report', scope: Scope.REQUEST })
export class ReportController {
  constructor(
    @Inject(QueryReportListUsecase)
    private readonly queryReportListUsecase: QueryReportListUsecase,
  ) {}

  @Get()
  reportList() {
    return this.queryReportListUsecase.execute();
  }

  @Post('/video')
  videoReport(@Body() dto) {
    throw new BadRequestException('method not implemented!');
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
