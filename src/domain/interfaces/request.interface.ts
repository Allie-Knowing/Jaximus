import { IJwtPayload } from './payload.interface';

export interface IUserReqeust extends Request {
  user: IJwtPayload;
}
