import { CreateVideoReportDto } from 'src/presentation/report/report.dto';
import { Report } from '../model/report';
import { User } from '../model/user';
import { Video } from '../model/video';

export interface ReportRepository {
  save(dto: CreateVideoReportDto, user: User, video: Video): Promise<void>;
  findAll(): Promise<Report[]>;
}
