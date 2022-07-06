import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { CreateStudentDto } from '../dto/create-student.dto';
import { CreateStatus } from '../interfaces/create-status.interface';
import { IStudent, IStudentSchema } from '../interfaces/student.interface';
import {
  IStudentRepository,
  StudentRepositoryInterface,
} from '../repositories/student-repository.interface';

@Injectable()
export class StudentService {
  constructor(
    @Inject(`${StudentRepositoryInterface}`)
    private readonly studentRepository: IStudentRepository,
  ) {}

  async create(createStudentDto: CreateStudentDto): Promise<CreateStatus> {
    let status: CreateStatus = {
      success: true,
      message: 'user created',
    };

    try {
      await this.studentRepository.create(createStudentDto);
    } catch (err) {
      status = {
        success: false,
        message: err,
      };
    }

    return status;
  }
}
