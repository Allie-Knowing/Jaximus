import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { InquiryTypeOrmEntity } from './inquiry.entity';

@Entity('inquiry_category')
export class InquiryCategoryTypeOrmEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 20 })
  title: string;

  @OneToMany(() => InquiryTypeOrmEntity, (inquiry) => inquiry.inquiryCategory)
  inquiries: InquiryTypeOrmEntity[];
}
