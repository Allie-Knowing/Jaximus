import { CreateCommentReportDto, CreateVideoReportDto } from 'src/presentation/report/report.dto';
import { Comment } from '../model/comment';
import { Report } from '../model/report';
import { User } from '../model/user';
import { Video } from '../model/video';

export interface ReportRepository {
  saveVideoReport(dto: CreateVideoReportDto, user: User, video: Video): Promise<void>;
  saveCommentReport(dto: CreateCommentReportDto, user: User, video: Video, comment: Comment): Promise<void>;
  findAll(): Promise<Report[]>;
}
