import { Like } from './like';

export class User {
  id: number;
  provider: string;
  email: string;
  profile: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
  like: Like[];
}
