import { ReportTypeOrmEntity } from 'src/infrastructure/entities/report.entity';
import { CreateCommentReportDto, CreateVideoReportDto, ReportResponseDto } from 'src/presentation/report/report.dto';
import { Comment } from '../model/comment';
import { User } from '../model/user';
import { Video } from '../model/video';

export interface ReportRepository {
  findOne(reportId: number): Promise<ReportTypeOrmEntity>;
  saveVideoReport(dto: CreateVideoReportDto, user: User, video: Video): Promise<void>;
  saveCommentReport(dto: CreateCommentReportDto, user: User, video: Video, comment: Comment): Promise<void>;
  findAll(): Promise<ReportResponseDto[]>;
  deleteReport(reportId: number): Promise<void>;
}
