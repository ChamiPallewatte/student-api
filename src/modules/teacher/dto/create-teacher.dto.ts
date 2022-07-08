import { ApiProperty } from '@nestjs/swagger';

export class CreateTeacherDto {
  @ApiProperty({ type: String, description: 'Teacher name' })
  readonly name: string;

  @ApiProperty({ type: Number, description: 'Teacher age' })
  readonly age: number;

  @ApiProperty({ type: String, description: 'Teacher subject' })
  readonly subject: string;

  @ApiProperty({ type: String, description: 'Teacher profileimage' })
  imgURL: string;
}
