import { Controller, Delete, Get, HttpCode, HttpStatus, Inject, Param, Post, Scope, UseGuards } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import { IUserRequest } from 'src/domain/interfaces/request.interface';
import { ExceptionsService } from 'src/infrastructure/exceptions/exceptions.service';
import { CreateInquiryUsecase } from 'src/usecase/inquiry/create-inquiry';
import { DeleteInquiryUsecase } from 'src/usecase/inquiry/delete-inquiry';
import { QueryInquiryListUsecase } from 'src/usecase/inquiry/query-inquiry-list';

@Controller({ path: '/admin/inquiry', scope: Scope.REQUEST })
export class InquiryController {
  constructor(
    @Inject(CreateInquiryUsecase)
    private readonly createInquiryUsecase: CreateInquiryUsecase,
    @Inject(QueryInquiryListUsecase)
    private readonly queryInquiryListUsecase: QueryInquiryListUsecase,
    @Inject(DeleteInquiryUsecase)
    private readonly deleteInquiryUsecase: DeleteInquiryUsecase,
    @Inject(REQUEST)
    private readonly request: IUserRequest,
  ) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  inquiryList() {
    return null;
  }

  @UseGuards(AuthGuard('jwt'))
  @Post()
  @HttpCode(HttpStatus.CREATED)
  inquiry() {
    return null;
  }

  @Delete('/:inquiryId')
  @HttpCode(HttpStatus.NO_CONTENT)
  deleteInquiry(@Param('inquiryId') inquiryId: number) {
    return null;
  }
}
