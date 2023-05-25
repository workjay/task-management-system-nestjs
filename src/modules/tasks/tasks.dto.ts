import {
  IsString,
  IsBoolean,
  IsOptional,
  IsNumber,
  IsMongoId,
} from 'class-validator';

export class CreateTaskDto {
  @IsString()
  title: string;

  @IsString()
  description: string;

  @IsBoolean()
  @IsOptional()
  status?: boolean;
}

export class UpdateTaskDto {
  @IsString()
  @IsOptional()
  title?: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsBoolean()
  @IsOptional()
  status?: boolean;
}

export class IndexQueryDto {
  @IsMongoId()
  @IsOptional()
  id?: string;

  @IsString()
  @IsOptional()
  size?: number;

  @IsString()
  @IsOptional()
  page?: number;

  @IsString()
  @IsOptional()
  order?: string;

  @IsString()
  @IsOptional()
  orderBy?: string;
}

export class TaskDto {
  readonly _id: string;
  readonly title: string;
  readonly description: string;
  readonly status: boolean;
  readonly createdAt: string;
}
