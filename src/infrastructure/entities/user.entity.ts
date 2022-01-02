import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { LikeTypeOrmEntity } from './like.entity';

@Entity('user')
export class UserTypeOrmEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 10 })
  provider: string;

  @Column({ length: 320 })
  email: string;

  @Column({ length: 2000 })
  profile: string;

  @Column({ length: 30 })
  name: string;

  @OneToMany(() => LikeTypeOrmEntity, (like) => like.user)
  likes: LikeTypeOrmEntity[];
}
