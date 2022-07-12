import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Inject, Param, ParseIntPipe, Post, Scope, UseGuards } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import { IUserRequest } from 'src/domain/interfaces/request.interface';
import { CreateInquiryUsecase } from 'src/usecase/inquiry/create-inquiry';
import { DeleteInquiryUsecase } from 'src/usecase/inquiry/delete-inquiry';
import { QueryInquiryListUsecase } from 'src/usecase/inquiry/query-inquiry-list';
import { CreateInquiryDto } from './inquiry.dto';

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
    return this.queryInquiryListUsecase.execute();
  }

  @UseGuards(AuthGuard('jwt'))
  @Post()
  @HttpCode(HttpStatus.CREATED)
  inquiry(@Body() dto: CreateInquiryDto) {
    return this.createInquiryUsecase.execute(dto, this.request.user.sub);
  }

  @Delete('/:inquiryId')
  @HttpCode(HttpStatus.NO_CONTENT)
  deleteInquiry(@Param('inquiryId', ParseIntPipe) inquiryId: number) {
    return this.deleteInquiryUsecase.execute(inquiryId);
  }
}
