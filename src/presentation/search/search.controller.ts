import { Controller, Get, HttpCode, HttpStatus, Inject, Query, Scope } from '@nestjs/common';
import { GetAutocompleteUsecase } from 'src/usecase/search/get-autocomplete';

@Controller({ path: '/search', scope: Scope.REQUEST })
export class SearchController {
  constructor(
    @Inject(GetAutocompleteUsecase)
    private readonly getAutocompleteUsecase: GetAutocompleteUsecase,
  ) {}

  @Get('autocomplete')
  autocomplete(@Query('q') q: string) {
    return this.getAutocompleteUsecase.execute(q);
  }
}
