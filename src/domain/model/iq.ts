export class Iq {
  userId: number;
  curCnt: number;
  totCnt: number;

  constructor(obj) {
    return Object.assign(this, obj);
  }
}
