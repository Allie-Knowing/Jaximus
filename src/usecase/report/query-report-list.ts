import { Report } from 'src/domain/model/report';
import { ReportRepository } from 'src/domain/repositories/report.repository';
import { ExceptionsService } from 'src/infrastructure/exceptions/exceptions.service';

export class QueryReportListUsecase {
  constructor(private readonly reportRepository: ReportRepository, private readonly exceptionService: ExceptionsService) {}

    async execute(): Promise<Report[]> {
        return await this.reportRepository.findAll();
    }
}
