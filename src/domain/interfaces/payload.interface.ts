export interface IJwtPayload {
  sub: number;
  type: 'access' | 'refresh';
}
