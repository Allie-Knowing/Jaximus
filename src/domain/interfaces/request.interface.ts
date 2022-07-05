import { IJwtPayload } from './payload.interface';

export interface IUserRequest extends Request {
  user: IJwtPayload;
}
