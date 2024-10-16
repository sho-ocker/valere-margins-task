import { IsInt, IsNotEmpty, IsString, IsIn } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from "@nestjs/swagger";

export class CreateClassDto {
  @ApiProperty({ description: 'The ID of the sport for the class' })
  @IsInt()
  @IsNotEmpty()
  sportId: number;

  @ApiProperty({ description: 'Day of the class' })
  @IsString()
  @IsNotEmpty()
  @IsIn(['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'], {
    message: 'Date must be a valid day of the week',
  })
  date: string;

  @ApiProperty({ description: 'Time of the class' })
  @IsString()
  @IsNotEmpty()
  time: string;

  @ApiProperty({ description: 'Description of the class' })
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty({ description: 'Frequency of the class per week' })
  @IsInt()
  @IsNotEmpty()
  @Type(() => Number)
  frequencyPerWeek: number;

  @ApiProperty({ description: 'Duration of the class' })
  @IsInt()
  @IsNotEmpty()
  @Type(() => Number)
  duration: number;
}
