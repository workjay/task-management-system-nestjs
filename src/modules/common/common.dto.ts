import { IsString, IsBoolean, IsNumber, IsOptional } from 'class-validator';

export class PaginationAPIResponseDto<T> {
  @IsBoolean()
  status: boolean;

  @IsString()
  @IsOptional()
  message?: string;

  @IsNumber()
  @IsOptional()
  count?: number;

  data?: T | any | null;
}

export class APIResponseDto<T> {
  @IsBoolean()
  status: boolean;

  @IsString()
  @IsOptional()
  message?: string;

  data?: T | any | null;
}
