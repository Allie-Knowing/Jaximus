import { Expose, Transform } from 'class-transformer';

export class GetActionPointPresenter {
  @Transform(({ value }) => {
    if (value) return parseInt(value);
  })
  @Expose({ name: 'action_point' })
  actionPoint: number;

  constructor(obj) {
    return Object.assign(this, obj);
  }
}
