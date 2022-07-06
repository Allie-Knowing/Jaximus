import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmConfigModule } from '../config/typeorm/typeorm.module';
import { ActionPointCategoryTypeOrmEntity } from '../entities/action-point-category.entity';
import { ActionPointTypeOrmEntity } from '../entities/action-point.entity';
import { BlockTypeOrmEntity } from '../entities/block.entity';
import { CommentTypeOrmEntity } from '../entities/comment.entity';
import { HashTagTypeOrmEntity } from '../entities/hash-tag.entity';
import { IqPaymentCategoryTypeOrmEntity } from '../entities/iq-payment-category.entity';
import { IqPaymentHistoryTypeOrmEntity } from '../entities/iq-payment-history.entity';
import { IqTypeOrmEntity } from '../entities/iq.entity';
import { LikeTypeOrmEntity } from '../entities/like.entity';
import { TierTypeOrmEntity } from '../entities/tier.entity';
import { UserTypeOrmEntity } from '../entities/user.entity';
import { VideoTypeOrmEntity } from '../entities/video.entity';
import { DatabaseBlockRepository } from './block.repository';
import { DatabaseCommentRepository } from './comment.repository';
import { DatabaseHashTagRepository } from './hash-tag.repository';
import { DatabaseIqRepository } from './iq.repository';
import { DatabaseLikeRepository } from './like.repository';
import { DatabaseTierRepository } from './tier.repository';
import { DatabaseUserRepository } from './user.repository';
import { DatabaseActionPointRepository } from './action-point.repository';
import { DatabaseIqPaymentHistoryRepository } from './iq-payment-history.repository';
import { DatabaseVideoRepository } from './video.repository';
import { CashExchangeTypeOrmEntity } from '../entities/cash_exchange.entity';
import { DatabaseCashExchangeRepository } from './cash_exchange.repository';
import { ReportTypeOrmEntity } from '../entities/report.entity';
import { DatabaseReportRepository } from './report.repository';
import { DatabaseIqPaymentCategoryRepository } from './iq-payment-category.repository';
import { InquiryTypeOrmEntity } from '../entities/inquiry.entity';
import { DatabaseInquiryRepository } from './inquiry.repository';

@Module({
  imports: [
    TypeOrmConfigModule,
    TypeOrmModule.forFeature([
      UserTypeOrmEntity,
      CommentTypeOrmEntity,
      HashTagTypeOrmEntity,
      VideoTypeOrmEntity,
      LikeTypeOrmEntity,
      IqTypeOrmEntity,
      TierTypeOrmEntity,
      BlockTypeOrmEntity,
      ActionPointTypeOrmEntity,
      ActionPointCategoryTypeOrmEntity,
      IqPaymentCategoryTypeOrmEntity,
      IqPaymentHistoryTypeOrmEntity,
      IqPaymentCategoryTypeOrmEntity,
      CashExchangeTypeOrmEntity,
      ReportTypeOrmEntity,
      InquiryTypeOrmEntity,
    ]),
  ],
  providers: [
    DatabaseUserRepository,
    DatabaseCommentRepository,
    DatabaseHashTagRepository,
    DatabaseVideoRepository,
    DatabaseLikeRepository,
    DatabaseIqRepository,
    DatabaseTierRepository,
    DatabaseBlockRepository,
    DatabaseActionPointRepository,
    DatabaseIqPaymentHistoryRepository,
    DatabaseIqPaymentCategoryRepository,
    DatabaseCashExchangeRepository,
    DatabaseReportRepository,
    DatabaseInquiryRepository,
  ],
  exports: [
    DatabaseUserRepository,
    DatabaseCommentRepository,
    DatabaseHashTagRepository,
    DatabaseVideoRepository,
    DatabaseLikeRepository,
    DatabaseIqRepository,
    DatabaseTierRepository,
    DatabaseBlockRepository,
    DatabaseActionPointRepository,
    DatabaseIqPaymentHistoryRepository,
    DatabaseIqPaymentCategoryRepository,
    DatabaseCashExchangeRepository,
    DatabaseReportRepository,
    DatabaseInquiryRepository,
  ],
})
export class RepositoriesModule {}
