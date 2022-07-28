import { ApiProperty } from '@nestjs/swagger';
import { ITeacher } from 'src/modules/teacher/interfaces/teacher.interface';
import { Teacher } from 'src/modules/teacher/models/teacher.model';

export class CreateStudentDto {
  @ApiProperty({ type: [Teacher], required: true })
  teacherArray: ITeacher[];

  @ApiProperty({ type: String, description: 'Student name' })
  readonly name: string;

  @ApiProperty({ type: Number, description: 'Student mathematics marks' })
  readonly mathsMarks: number;

  @ApiProperty({ type: Number, description: 'Student science marks' })
  readonly scienceMarks: number;

  @ApiProperty({ type: Number, description: 'Student english marks' })
  readonly englishMarks: number;
}
