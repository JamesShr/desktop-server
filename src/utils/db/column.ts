import { Column, CreateDateColumn, UpdateDateColumn, DeleteDateColumn } from 'typeorm';

export const IsDeleted = Column({
  name: 'is_deleted',
  type: 'boolean',
  nullable: false,
  select: false,
  default: false,
  comment: 'soft delete',
});

export const ModifiedBy = Column({
  name: 'modified_by_user_id',
  type: 'integer',
  nullable: false,
  select: false,
});

export const CreateDate = CreateDateColumn({
  name: 'created_at',
  type: 'timestamp',
  default: 'CURRENT_TIMESTAMP',
  nullable: false,
  select: false,
});

export const UpdateDate = UpdateDateColumn({
  name: 'updated_at',
  type: 'timestamp',
  default: 'CURRENT_TIMESTAMP',
  nullable: false,
  select: false,
});

export const DeleteDate = DeleteDateColumn({
  name: 'updated_at',
  type: 'timestamp',
  default: 'CURRENT_TIMESTAMP',
  nullable: false,
  select: false,
});
