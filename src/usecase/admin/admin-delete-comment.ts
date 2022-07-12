import { ActionPointRepository } from 'src/domain/repositories/action-point.repository';
import { CommentRepository } from 'src/domain/repositories/comment.repository';
import { ReportRepository } from 'src/domain/repositories/report.repository';
import { UserRepository } from 'src/domain/repositories/user.repository';
import { ExceptionsService } from 'src/infrastructure/exceptions/exceptions.service';

export class AdminDeleteCommentUsecase {
  constructor(
    private readonly commentRepository: CommentRepository,
    private readonly reportRepositroy: ReportRepository,
    private readonly actionPointRepository: ActionPointRepository,
    private readonly userRepository: UserRepository,
    private readonly exceptionsService: ExceptionsService,
  ) {}

  async execute(commentId: number, reportId: number) {
    const comment = await this.commentRepository.findOne(commentId);
    if (!comment) this.exceptionsService.commentNotFoundException();

    const report = await this.reportRepositroy.findOne(reportId);
    if (!report) this.exceptionsService.reportNotFoundException();

    const reportedUser = await this.userRepository.findOne(comment.userId);
    const reportApprovedUser = await this.userRepository.findOne(report.user.id);

    await this.actionPointRepository.saveActionPoint(reportApprovedUser, 8);
    await this.actionPointRepository.saveActionPoint(reportedUser, 10);

    await this.commentRepository.deleteCommentAnswer(commentId);
  }
}
