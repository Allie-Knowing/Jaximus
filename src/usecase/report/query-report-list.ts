import { ReportRepository } from 'src/domain/repositories/report.repository';
import { ReportResponseDto } from 'src/presentation/report/report.dto';

export class QueryReportListUsecase {
  constructor(private readonly reportRepository: ReportRepository) {}

  async execute(): Promise<ReportResponseDto[]> {
    return await this.reportRepository.findAll();
  }
}
