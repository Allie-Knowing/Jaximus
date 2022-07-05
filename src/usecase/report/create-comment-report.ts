import { CommentRepository } from 'src/domain/repositories/comment.repository';
import { ReportRepository } from 'src/domain/repositories/report.repository';
import { UserRepository } from 'src/domain/repositories/user.repository';
import { VideoRepository } from 'src/domain/repositories/video.repository';
import { ExceptionsService } from 'src/infrastructure/exceptions/exceptions.service';
import { CreateCommentReportDto } from 'src/presentation/report/report.dto';

export class CreateCommentReportUsecase {
  constructor(
    private readonly reportRepository: ReportRepository,
    private readonly userRepository: UserRepository,
    private readonly videoRepository: VideoRepository,
    private readonly commentRepositroy: CommentRepository,
    private readonly exceptionsService: ExceptionsService,
  ) {}

  async execute(dto: CreateCommentReportDto, userId: number) {
    const user = await this.userRepository.findOne(userId);
    if (!user || user.deletedAt) {
      this.exceptionsService.userNotFoundException();
    }

    const video = await this.videoRepository.findOne(dto.videoId);
    if (!video) {
      this.exceptionsService.videoNotFoundException();
    }

    const comment = await this.commentRepositroy.findOne(dto.commentId);
    if (!comment) {
      this.exceptionsService.commentNotFoundException();
    }

    await this.reportRepository.saveCommentReport(dto, user, video, comment);
  }
}
