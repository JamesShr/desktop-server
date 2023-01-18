import { PageQueryDto } from '@/modules/common/validations/pagingQuery.validation';
import { LimitOffset } from './limitOffset.interface';

export function buildLimitOffset(dto: PageQueryDto): LimitOffset {
  return {
    limit: dto.limit,
    offset: (dto.page - 1) * dto.limit,
  };
}
