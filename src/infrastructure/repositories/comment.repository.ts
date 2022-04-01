import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Comment } from 'src/domain/model/comment';
import { Video } from 'src/domain/model/video';
import { CommentRepository } from 'src/domain/repositories/comment.repository';
import { Repository } from 'typeorm';
import { CommentTypeOrmEntity } from '../entities/comment.entity';
import { UserTypeOrmEntity } from '../entities/user.entity';

@Injectable()
export class DatabaseCommentRepository implements CommentRepository {
  constructor(
    @InjectRepository(CommentTypeOrmEntity)
    private readonly commentEntityRepository: Repository<CommentTypeOrmEntity>,

    @InjectRepository(UserTypeOrmEntity)
    private readonly userEntityRepository: Repository<UserTypeOrmEntity>,
  ) {}

  findOne(commentId: number) {
    return this.commentEntityRepository.findOne(commentId);
  }

  async commentAdoption(commentId: number): Promise<void> {
    await this.commentEntityRepository
      .createQueryBuilder()
      .update(CommentTypeOrmEntity)
      .set({ isAdoption: true })
      .where('id = :id', { id: commentId })
      .andWhere('video.deleted_at IS NULL')
      .execute();
  }

  async deleteCommentAnswer(commentId: number): Promise<void> {
    await this.commentEntityRepository.softDelete(commentId);
  }

  matchUser(userId: number) {
    return this.commentEntityRepository
      .createQueryBuilder('comment')
      .select()
      .where('comment.user_id = :user_id', { user_id: userId })
      .getCount();
  }

  findComment(commentId: number, userId: number) {
    return this.commentEntityRepository
      .createQueryBuilder('comment')
      .select('comment.id')
      .where('comment.id = :comment_id', { comment_id: commentId })
      .andWhere('comment.user_id = :user_id', { user_id: userId })
      .andWhere('video.deleted_at IS NULL')
      .getOne();
  }

  async createCommentAnswer(content: string, question: Video, userId: number): Promise<void> {
    const user: UserTypeOrmEntity = await this.userEntityRepository.findOne(userId);

    await this.commentEntityRepository.save({
      content,
      questionId: question.id,
      user,
    });
  }
}
