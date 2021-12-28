import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
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
}
