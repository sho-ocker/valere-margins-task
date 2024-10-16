import { IsInt, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UserClassDto {
  @ApiProperty({ description: 'ID of the class', example: 1 })
  @IsInt()
  @IsNotEmpty()
  classId: number;

  @ApiProperty({ description: 'ID of the user', example: 101 })
  @IsInt()
  @IsNotEmpty()
  userId: number;
}
