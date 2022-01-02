import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { hashTagRepository } from 'src/domain/repositories/hash-tag.repository';
import { Repository } from 'typeorm';
import { HashTagTypeOrmEntity } from '../entities/hash-tag.entity';

@Injectable()
export class DatabaseHashTagRepository implements hashTagRepository {
  constructor(
    @InjectRepository(HashTagTypeOrmEntity)
    private readonly hashTagEntityRepository: Repository<HashTagTypeOrmEntity>,
  ) {}
}
