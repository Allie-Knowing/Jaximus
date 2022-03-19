import { IException } from 'src/domain/exceptions/exceptions.interface';
import { LikeRepository } from 'src/domain/repositories/like.repository';
import { LikeTypeOrmEntity } from 'src/infrastructure/entities/like.entity';
import { UserTypeOrmEntity } from 'src/infrastructure/entities/user.entity';
import { VideoTypeOrmEntity } from 'src/infrastructure/entities/video.entity';
import { Repository } from 'typeorm';

export class CreateLikeUsecase {
  constructor(
    private readonly likeRepository: LikeRepository,
    private readonly exceptionsService: IException,
    private readonly likeEntityRepository: Repository<LikeTypeOrmEntity>,
    private readonly userEntityRepository: Repository<UserTypeOrmEntity>,
    private readonly videoEntityRepository: Repository<VideoTypeOrmEntity>,
  ) {}

  async execute(videoId: number, userId: number) {
    const checkTheLike = await this.likeRepository.findOne(videoId, userId);
    if (checkTheLike) this.exceptionsService.likesAlreadyExistException();

    const user: UserTypeOrmEntity = await this.userEntityRepository.findOne(userId);
    const video: VideoTypeOrmEntity = await this.videoEntityRepository.findOne(videoId);

    await this.likeEntityRepository.save({
      user,
      video,
    });
  }
}
