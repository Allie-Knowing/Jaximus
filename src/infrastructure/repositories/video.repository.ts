import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Video } from 'src/domain/model/video';
import { VideoRepository } from 'src/domain/repositories/video.repository';
import { Repository } from 'typeorm';
import { UserTypeOrmEntity } from '../entities/user.entity';
import { VideoTypeOrmEntity } from '../entities/video.entity';

@Injectable()
export class DatabaseVideoRepository implements VideoRepository {
  constructor(
    @InjectRepository(VideoTypeOrmEntity)
    private readonly videoEntityRepository: Repository<VideoTypeOrmEntity>,

    @InjectRepository(UserTypeOrmEntity)
    private readonly userEntityRepository: Repository<UserTypeOrmEntity>
  ) {}

  async save(video: Video): Promise<void> {
      const user: UserTypeOrmEntity = await this.userEntityRepository.findOne(video.userId);
      
      this.videoEntityRepository.create({
        description: video.description,
        title: video.title,
        videoUrl: video.videoUrl,
        user
      });
  }
}
