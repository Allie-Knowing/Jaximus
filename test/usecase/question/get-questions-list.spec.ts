import { GetQuestionListUsecase } from '../../../src/usecase/question/get-questions-list';
import { Test, TestingModule } from '@nestjs/testing';
import { ExceptionsModule } from '../../../src/infrastructure/exceptions/exceptions.module';
import { ExceptionsService } from '../../../src/infrastructure/exceptions/exceptions.service';
import { mockVideoRepository } from '../../mock/repositories/video.repository.mock';

describe('GetQuestionListUsecase', () => {
  let usecase: GetQuestionListUsecase;
  const videoRepository = mockVideoRepository();

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [ExceptionsModule],
      providers: [
        ExceptionsService,
        {
          inject: [ExceptionsService],
          provide: GetQuestionListUsecase,
          useFactory: (exceptionsService: ExceptionsService) => new GetQuestionListUsecase(videoRepository, exceptionsService),
        },
      ],
    }).compile();

    usecase = module.get<GetQuestionListUsecase>(GetQuestionListUsecase);
  });

  it('should be defined', () => {
    expect(usecase).toBeDefined();
  });

  it('should throw questionNotFoundException', async () => {
    videoRepository.findQuestionList.mockResolvedValue([]);
    try {
      await usecase.execute(1, 1, 1);
    } catch (e) {
      expect(e.message).toEqual('Question not found exception');
    }
  });
});
