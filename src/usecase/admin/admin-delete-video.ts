import { ActionPointRepository } from 'src/domain/repositories/action-point.repository';
import { ReportRepository } from 'src/domain/repositories/report.repository';
import { UserRepository } from 'src/domain/repositories/user.repository';
import { VideoRepository } from 'src/domain/repositories/video.repository';
import { ExceptionsService } from 'src/infrastructure/exceptions/exceptions.service';

export class AdminDeleteVideoUsecase {
  constructor(
    private readonly videoRepository: VideoRepository,
    private readonly reportRepositroy: ReportRepository,
    private readonly actionPointRepository: ActionPointRepository,
    private readonly userRepository: UserRepository,
    private readonly exceptionsService: ExceptionsService,
  ) {}

  async execute(videoId: number, reportId: number) {
    const video = await this.videoRepository.findOne(videoId);
    if (!video) this.exceptionsService.videoNotFoundException();

    const report = await this.reportRepositroy.findOne(reportId);
    if (!report) this.exceptionsService.reportNotFoundException();

    const reportedUser = await this.userRepository.findOne(video.userId);
    const reportApprovedUser = await this.userRepository.findOne(report.user.id);

    await this.actionPointRepository.saveActionPoint(reportApprovedUser, 8);
    await this.actionPointRepository.saveActionPoint(reportedUser, 10);

    await this.videoRepository.deleteVideo(videoId);
  }
}
