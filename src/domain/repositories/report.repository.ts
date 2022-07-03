import { ReportTypeOrmEntity } from 'src/infrastructure/entities/report.entity'
import { Report } from '../model/report';

export interface ReportRepository {
    save(report): Promise<ReportTypeOrmEntity>;
    findAll():Promise<Report[]>;
}