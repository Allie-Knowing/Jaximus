import { Expose, Transform } from 'class-transformer';

export class GetAnswerCountPresenter {
  @Transform(({ value }) => {
    if (value) return parseInt(value);
  })
  @Expose({ name: 'video_answer_cnt' })
  videoAnswerCnt: number;

  constructor(obj) {
    return Object.assign(this, obj);
  }
}
