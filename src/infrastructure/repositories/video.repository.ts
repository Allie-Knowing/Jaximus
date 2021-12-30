import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { VideoRepository } from 'src/domain/repositories/video.repository';
import { Repository } from 'typeorm';
import { VideoTypeOrmEntity } from '../entities/video.entity';

@Injectable()
export class DatabaseVideoRepository implements VideoRepository {
  constructor(
    @InjectRepository(VideoTypeOrmEntity)
    private readonly videoEntityRepository: Repository<VideoTypeOrmEntity>,
  ) {}
}
