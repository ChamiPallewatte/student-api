import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { IPaginatedEntity, IPagination } from 'src/core/pagination';
import { IRepositoryOption } from 'src/core/repository/interface';
import { CreateStudentDto } from '../dto/create-student.dto';
import { StudentFilterDto } from '../dto/filter-student.dto';
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

  async findAll(
    filter: StudentFilterDto,
    page: IPagination,
  ): Promise<IPaginatedEntity<IStudent>> {
    const options: IRepositoryOption = {};
    return await this.studentRepository.findAllWithPaginate(filter, page);
  }

  async findById(id: string): Promise<IStudent> {
    return await this.studentRepository.findById(id);
  }

  async delete(id: string) {
    return await this.studentRepository.deleteById(id);
  }

  async update(id: string, data: CreateStudentDto) {
    return await this.studentRepository.findByIdAndUpdate(id, data);
  }
}
