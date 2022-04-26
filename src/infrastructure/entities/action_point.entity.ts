import { CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { ActionPointCategoryTypeOrmEntity } from './action_point_category.entity';
import { UserTypeOrmEntity } from './user.entity';

@Entity('action_point')
export class ActionPointTypeOrmEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn()
  createdAt: Date;

  @ManyToOne(() => UserTypeOrmEntity, (user) => user.actionPoint)
  @JoinColumn({ name: 'user_id' })
  user: UserTypeOrmEntity;

  @ManyToOne(() => ActionPointCategoryTypeOrmEntity, (actionPointCategory) => actionPointCategory.actionPoint)
  @JoinColumn({ name: 'category_id' })
  actionPointCategory: ActionPointCategoryTypeOrmEntity;
}
