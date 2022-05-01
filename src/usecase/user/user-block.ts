import { IException } from 'src/domain/exceptions/exceptions.interface';
import { BlockRepository } from 'src/domain/repositories/block.repository';
import { UserRepository } from 'src/domain/repositories/user.repository';
import { VideoRepository } from 'src/domain/repositories/video.repository';

export class UserBlockUsecase {
  constructor(
    private readonly videoRepository: VideoRepository,
    private readonly blockRepository: BlockRepository,
    private readonly userRepository: UserRepository,
    private readonly exceptionService: IException,
  ) {}

  async execute(userId: number, videoId: number): Promise<void> {
    const blockUserIdObj = await this.videoRepository.findVideoOwner(videoId);
    if (!blockUserIdObj.userId) this.exceptionService.videoNotFoundException();
    const userRecord = await this.userRepository.findOne(userId);
    const blockUserRecord = await this.userRepository.findOne(blockUserIdObj.userId);
    this.blockRepository.save(userRecord, blockUserRecord);
  }
}
