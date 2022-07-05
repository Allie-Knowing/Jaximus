import { Report } from 'src/domain/model/report';
import { ReportRepository } from 'src/domain/repositories/report.repository';

export class QueryReportListUsecase {
  constructor(private readonly reportRepository: ReportRepository) {}

  async execute(): Promise<Report[]> {
    return await this.reportRepository.findAll();
  }
}
