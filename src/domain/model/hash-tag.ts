import { Video } from './video';

export class HashTag {
  id: number;
  title: string;
  question: Video;

  constructor(obj) {
    return Object.assign(this, obj);
  }
}
