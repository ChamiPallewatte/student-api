import { ApiProperty } from '@nestjs/swagger';

export class CreateStudentDto {
  @ApiProperty({ type: String, description: 'Student name' })
  readonly name: string;

  @ApiProperty({ type: Number, description: 'Student mathematics marks' })
  readonly mathsMarks: number;

  @ApiProperty({ type: Number, description: 'Student science marks' })
  readonly scienceMarks: number;

  @ApiProperty({ type: Number, description: 'Student english marks' })
  readonly englishMarks: number;
}
