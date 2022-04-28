import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmConfigModule } from '../config/typeorm/typeorm.module';
import { CommentTypeOrmEntity } from '../entities/comment.entity';
import { HashTagTypeOrmEntity } from '../entities/hash-tag.entity';
import { IqTypeOrmEntity } from '../entities/iq.entity';
import { LikeTypeOrmEntity } from '../entities/like.entity';
import { TierTypeOrmEntity } from '../entities/tier.entity';
import { UserTypeOrmEntity } from '../entities/user.entity';
import { VideoTypeOrmEntity } from '../entities/video.entity';
import { DatabaseCommentRepository } from './comment.repository';
import { DatabaseHashTagRepository } from './hash-tag.repository';
import { DatabaseIqRepository } from './iq.repository';
import { DatabaseLikeRepository } from './like.repository';
import { DatabaseTierRepository } from './tier.repository';
import { DatabaseUserRepository } from './user.repository';
import { DatabaseVideoRepository } from './video.repository';

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
  ],
  exports: [
    DatabaseUserRepository,
    DatabaseCommentRepository,
    DatabaseHashTagRepository,
    DatabaseVideoRepository,
    DatabaseLikeRepository,
    DatabaseIqRepository,
    DatabaseTierRepository,
  ],
})
export class RepositoriesModule {}
