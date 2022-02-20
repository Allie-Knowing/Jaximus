export interface IJwtPayload {
  userId: number;
  type: 'access' | 'refresh';
}
