import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { VideoRepository } from 'src/domain/repositories/video-repository.interface';
import { Repository } from 'typeorm';
import { Video } from '../entities/video.entity';

@Injectable()
export class DatabaseVideoRepository implements VideoRepository {
  constructor(
    @InjectRepository(Video)
    private readonly videoEntityRepository: Repository<Video>,
  ) {}
}
