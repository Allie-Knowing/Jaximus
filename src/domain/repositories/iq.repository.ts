import { Iq } from '../model/iq';

export interface IqRepository {
  getIq(userId: number): Promise<Iq>;
  iqExpenditure(userId: number, compensation: number): Promise<void>;
  questionVideoEvent(userId: number): void;
  answerVideoEvent(userId: number): void;
}
