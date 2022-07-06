import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { InquiryCategoryTypeOrmEntity } from './inquiry-category.entity';
import { UserTypeOrmEntity } from './user.entity';

@Entity('inquiry')
export class InquiryTypeOrmEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  title: string;

  @Column({ type: 'text' })
  description: string;

  @ManyToOne(() => UserTypeOrmEntity, (user) => user.inquiries)
  @JoinColumn({ name: 'user_id' })
  user: UserTypeOrmEntity;

  @CreateDateColumn()
  createdAt: Date;

  @ManyToOne(() => InquiryCategoryTypeOrmEntity, (inquiryCategory) => inquiryCategory.inquiries)
  @JoinColumn({ name: 'inquirt_categpry_id' })
  inquiryCategory: InquiryCategoryTypeOrmEntity;
}
