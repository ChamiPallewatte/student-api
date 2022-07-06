import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { CreateStudentDto } from '../dto/create-student.dto';
import { CreateStatus } from '../interfaces/create-status.interface';
import { StudentService } from '../services/student.service';

@Controller('student')
export class StudentController {
  constructor(private readonly studentService: StudentService) {}

  @Post('create')
  public async createStudent(
    @Body() createStudentDto: CreateStudentDto,
  ): Promise<CreateStatus> {
    const result: CreateStatus = await this.studentService.create(
      createStudentDto,
    );
    if (!result.success) {
      throw new HttpException(result.message, HttpStatus.BAD_REQUEST);
    }
    return result;
  }
}
