import { Controller, Get, HttpCode, HttpStatus, Inject, Query, Scope } from '@nestjs/common';
import { QueryHashtagUsecase } from 'src/usecase/search/query-hash-tag';
import { QueryTitleUsecase } from 'src/usecase/search/query-title';

@Controller({ path: '/search', scope: Scope.REQUEST })
export class SearchController {
  constructor(
    @Inject(QueryTitleUsecase)
    private readonly queryTitleUsecase: QueryTitleUsecase,
    @Inject(QueryHashtagUsecase)
    private readonly queryHashTagUsecase: QueryHashtagUsecase,
  ) {}

  @Get('title')
  title(@Query('q') q: string) {
    return this.queryTitleUsecase.execute(q);
  }

  @Get('hashtag')
  hashtag(@Query('q') q: string) {
    return this.queryHashTagUsecase.execute(q);
  }
}
