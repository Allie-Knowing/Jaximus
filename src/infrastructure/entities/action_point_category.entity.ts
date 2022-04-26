import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { ActionPointTypeOrmEntity } from './action_point.entity';

@Entity('action_point_category')
export class ActionPointCategoryTypeOrmEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 20 })
  name: string;

  @Column()
  score: number;

  @OneToMany(() => ActionPointTypeOrmEntity, (actionPoint) => actionPoint.actionPointCategory)
  actionPoint: ActionPointTypeOrmEntity[];
}
