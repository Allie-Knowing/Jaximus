import { Expose, Transform } from 'class-transformer';

export class Tier {
  @Expose({ name: 'user_id' })
  userId: number;

  @Expose({ name: 'category_id' })
  categoryId: number;

  @Expose({ name: 'updated_at' })
  updatedAt: Date;

  @Expose({ name: 'category_name' })
  categoryName: string;

  @Transform(({ value }) => {
    if (value) return parseInt(value);
  })
  @Expose({ name: 'cur_cnt' })
  curCnt: number;

  @Transform(({ value }) => {
    if (value) return parseInt(value);
  })
  @Expose({ name: 'tot_cnt' })
  totCnt: number;

  @Expose({ name: 'next_tot_iq' })
  nextTotIq: number;

  @Expose({ name: 'next_adoption_cnt' })
  nextAdoptionCnt: number;

  @Expose({ name: 'image_url' })
  imageUrl: string;

  @Expose({ name: 'adoption_cnt' })
  adoptionCnt: number;

  constructor(obj) {
    return Object.assign(this, obj);
  }
}
