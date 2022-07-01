import { Transform } from 'class-transformer';

export class GetCountUserQuestionPresenter {
  @Transform(({ value }) => {
    if (value) return parseInt(value);
  })
  videoCnt: number;

  constructor(obj) {
    return Object.assign(this, obj);
  }
}
