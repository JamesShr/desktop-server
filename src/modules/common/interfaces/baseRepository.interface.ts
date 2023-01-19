import { InsertResult, UpdateResult, DeleteResult, SelectQueryBuilder } from "typeorm";
import { LimitOffset } from '@/utils/paging/limitOffset.interface';

export interface BaseRepository<T> {
  list(dto?: { query?: {}; paging: LimitOffset }): Promise<{
    data: T[];
    totalCount: number;
  }>;
  findOne(): Promise<T>;
  toEntity(dto: Object): T;
  create(entities: T[]): Promise<InsertResult>;
  update(): Promise<UpdateResult>;
  delete(): Promise<DeleteResult>;
  editQb(qb: SelectQueryBuilder<T>): SelectQueryBuilder<T>;
}
