import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Comment } from 'src/domain/model/comment';
import { CommentRepository } from 'src/domain/repositories/comment.repository';
import { Repository } from 'typeorm';
import { CommentTypeOrmEntity } from '../entities/comment.entity';
import { UserTypeOrmEntity } from '../entities/user.entity';
import { VideoTypeOrmEntity } from '../entities/video.entity';

@Injectable()
export class DatabaseCommentRepository implements CommentRepository {
  constructor(
    @InjectRepository(CommentTypeOrmEntity)
    private readonly commentEntityRepository: Repository<CommentTypeOrmEntity>,

    @InjectRepository(UserTypeOrmEntity)
    private readonly userEntityRepository: Repository<UserTypeOrmEntity>,
  ) {}

  async findTextAnswer(questionId: number, page: number, size: number): Promise<Comment[]> {
    const textAnswers: any[] = await this.commentEntityRepository
      .createQueryBuilder('comment')
      .innerJoin('comment.video', 'video')
      .innerJoin('comment.user', 'user')
      .select('comment.id')
      .addSelect('comment.content')
      .addSelect('comment.updateAt')
      .addSelect('comment.isAdoption')
      .addSelect('user.id')
      .addSelect('user.profile')
      .offset(page * size)
      .limit(size)
      .where('video.id := id', { id: questionId })
      .getMany();

    return textAnswers.map((t) => new Comment(t));
  }

  findOne(commentId: number) {
    return this.commentEntityRepository.findOne(commentId);
  }

  async commentAdoption(commentId: number): Promise<void> {
    await this.commentEntityRepository
      .createQueryBuilder()
      .update(CommentTypeOrmEntity)
      .set({ isAdoption: true })
      .where('id = :id', { id: commentId })
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
      .getOne();
  }

  async createCommentAnswer(content: string, question: VideoTypeOrmEntity, userId: number): Promise<void> {
    const user: UserTypeOrmEntity = await this.userEntityRepository.findOne(userId);

    await this.commentEntityRepository.save({
      content,
      question: question.id,
      user,
    });
  }
}
