import { PageQueryDto } from '@/modules/common/validations/pagingQuery.validation';

export const DEFAULT_PAGE_QUERY: PageQueryDto = {
  page: 1,
  limit: 50,
};

export function buildPageQuery(page?: number, limit?: number): PageQueryDto {
  return {
    ...(!Number.isNaN(page) && page !== undefined
      ? { page }
      : { page: DEFAULT_PAGE_QUERY.page }),
    ...(!Number.isNaN(limit) && limit !== undefined
      ? { limit }
      : { limit: DEFAULT_PAGE_QUERY.limit }),
  };
}
