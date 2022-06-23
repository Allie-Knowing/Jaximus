import { MockRepository } from './types';
import { VideoRepository } from '../../../src/domain/repositories/video.repository';

export const mockVideoRepository = (): MockRepository<VideoRepository> => ({
  save: jest.fn(),
  findQuestionList: jest.fn(),
  findVideoAnswerList: jest.fn(),
  findQuestionDetail: jest.fn(),
  findQuestionVideoList: jest.fn(),
  findVideoOwner: jest.fn(),
  findAnswerCount: jest.fn(),
  createVideoAnswer: jest.fn(),
  videoAdoption: jest.fn(),
  userQuestionList: jest.fn(),
  userAnswerList: jest.fn(),
  deleteVideo: jest.fn(),
  findOne: jest.fn(),
  findUsersQuestion: jest.fn(),
  findUsersVideo: jest.fn(),
  findVideoAnswerDetail: jest.fn(),
  checkVideoAnswer: jest.fn(),
  checkAdoption: jest.fn(),
  isMine: jest.fn(),
  videoViews: jest.fn(),
});
