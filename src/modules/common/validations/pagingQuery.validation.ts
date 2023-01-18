import { IsOptional, IsPositive, IsNumber, Max } from 'class-validator';
import { Transform } from 'class-transformer';

export class PageQueryDto {
  @Transform(({ value }: { value: string }) => {
    return parseInt(value, 10);
  })
  @IsOptional()
  @IsNumber()
  @IsPositive()
  public readonly page?: number;

  @Transform(({ value }: { value: string }) => {
    return parseInt(value, 10);
  })
  @IsOptional()
  @IsNumber()
  @IsPositive()
  @Max(1000)
  public readonly limit?: number;
}
