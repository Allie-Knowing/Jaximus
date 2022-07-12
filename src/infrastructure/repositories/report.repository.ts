import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Comment } from 'src/domain/model/comment';
import { User } from 'src/domain/model/user';
import { Video } from 'src/domain/model/video';
import { ReportRepository } from 'src/domain/repositories/report.repository';
import { CreateCommentReportDto, CreateVideoReportDto, ReportResponseDto } from 'src/presentation/report/report.dto';
import { Repository } from 'typeorm';
import { CommentTypeOrmEntity } from '../entities/comment.entity';
import { ReportTypeOrmEntity } from '../entities/report.entity';
import { UserTypeOrmEntity } from '../entities/user.entity';
import { VideoTypeOrmEntity } from '../entities/video.entity';

@Injectable()
export class DatabaseReportRepository implements ReportRepository {
  constructor(
    @InjectRepository(ReportTypeOrmEntity)
    private readonly reportEntityRepository: Repository<ReportTypeOrmEntity>,
  ) {}

  async findOne(reportId: number): Promise<ReportTypeOrmEntity> {
    return await this.reportEntityRepository.findOne(reportId, { relations: ['user'] });
  }

  async saveVideoReport(dto: CreateVideoReportDto, user: User, video: Video): Promise<void> {
    await this.reportEntityRepository.save({
      user: UserTypeOrmEntity.of(user),
      video: VideoTypeOrmEntity.of(video),
      description: dto.description,
    });
  }

  async saveCommentReport(dto: CreateCommentReportDto, user: User, video: Video, comment: Comment): Promise<void> {
    await this.reportEntityRepository.save({
      comment: CommentTypeOrmEntity.of(comment),
      user: UserTypeOrmEntity.of(user),
      video: VideoTypeOrmEntity.of(video),
      description: dto.description,
    });
  }

  async findAll(): Promise<ReportResponseDto[]> {
    const reportList = await this.reportEntityRepository
      .createQueryBuilder('report')
      .select('video.id', 'videoId')
      .addSelect('report.id', 'reportId')
      .addSelect('user.id', 'userId')
      .addSelect('report.description', 'description')
      .addSelect('comment.id', 'commentId')
      .addSelect('video.videoUrl', 'videoUrl')
      .addSelect('report.createdAt', 'createdAt')
      .leftJoin('report.user', 'user')
      .leftJoin('report.video', 'video')
      .leftJoin('report.comment', 'comment')
      .getRawMany();

    return reportList.map((report: ReportTypeOrmEntity) => {
      return new ReportResponseDto(report);
    });
  }

  async deleteReport(reportId: number): Promise<void> {
    await this.reportEntityRepository.softDelete(reportId);
  }
}
