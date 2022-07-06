import { Injectable } from '@nestjs/common';
import { InquiryRepository } from 'src/domain/repositories/inquiry.repositroy';

@Injectable()
export class DatabaseInquiryRepository implements InquiryRepository {

}