import { UserRepository } from 'src/domain/repositories/user.repository';

export class UpdateExpoTokenUsecase {
  constructor(private readonly userRepository: UserRepository) {}

  execute(userId: number, expoToken: string): void {
    return this.userRepository.updateExpoToken(userId, expoToken);
  }
}
