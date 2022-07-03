import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Report } from 'src/domain/model/report';
import { ReportRepository } from 'src/domain/repositories/report.repository';
import { Repository } from 'typeorm';
import { ReportTypeOrmEntity } from '../entities/report.entity';

@Injectable()
export class DatabaseReportRepository implements ReportRepository {
  constructor(
    @InjectRepository(ReportTypeOrmEntity)
    private readonly reportEntityRepository: Repository<ReportTypeOrmEntity>,
  ) {}

  save(report: any): Promise<ReportTypeOrmEntity> {
    throw new Error('Method not implemented.');
  }

  async findAll(): Promise<Report[]> {
    const reportList = await this.reportEntityRepository.find({ relations: ['user', 'video', 'comment'] });
    return reportList.map((report: ReportTypeOrmEntity) => {
      return new Report(report);
    });
  }
}
