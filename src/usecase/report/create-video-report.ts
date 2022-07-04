import { ReportRepository } from 'src/domain/repositories/report.repository';
import { UserRepository } from 'src/domain/repositories/user.repository';
import { VideoRepository } from 'src/domain/repositories/video.repository';
import { ExceptionsService } from 'src/infrastructure/exceptions/exceptions.service';
import { CreateVideoReportDto } from 'src/presentation/report/report.dto';

export class CreateVideoReportUsecase {
  constructor(
    private readonly reportRepository: ReportRepository,
    private readonly userRepository: UserRepository,
    private readonly videoRepository: VideoRepository,
    private readonly exceptinoService: ExceptionsService,
  ) {}

  async execute(dto: CreateVideoReportDto, userId: number) {
    const user = await this.userRepository.findOne(userId);
    if (!user || user.deletedAt) {
      this.exceptinoService.userNotFoundException();
    }

    const video = await this.videoRepository.findOne(dto.videoId);
    if (!video) {
      this.exceptinoService.videoNotFoundException();
    }

    this.reportRepository.save(dto, user, video);
  }
}
