import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BlockRepository } from 'src/domain/repositories/block.repository';
import { Repository } from 'typeorm';
import { BlockTypeOrmEntity } from '../entities/block.entity';
import { UserTypeOrmEntity } from '../entities/user.entity';

@Injectable()
export class DatabaseBlockRepository implements BlockRepository {
  constructor(
    @InjectRepository(BlockTypeOrmEntity)
    private readonly blockEntityRepository: Repository<BlockTypeOrmEntity>,
  ) {}

  save(userId: UserTypeOrmEntity, blockUserId: UserTypeOrmEntity): void {
    const block: BlockTypeOrmEntity = this.blockEntityRepository.create({
      userId,
      blockUserId,
    });

    this.blockEntityRepository.save(block);
  }
}
