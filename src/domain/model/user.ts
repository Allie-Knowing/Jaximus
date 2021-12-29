import { LikeM } from './like';

export class UserM {
  id: number;
  provider: string;
  email: string;
  profile: string;
  name: string;
  like: LikeM[];
}
