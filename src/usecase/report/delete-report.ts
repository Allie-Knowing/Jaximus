import { ReportRepository } from 'src/domain/repositories/report.repository';
import { ExceptionsService } from 'src/infrastructure/exceptions/exceptions.service';

export class DeleteReportUsecase {
  constructor(private readonly reportRepository: ReportRepository, private readonly exceptionService: ExceptionsService) {}

  async execute(reportId: number) {
    const report = await this.reportRepository.findOne(reportId);
    
    if (!report) this.exceptionService.reportNotFoundException();

    await this.reportRepository.deleteReport(reportId);
  }
}
