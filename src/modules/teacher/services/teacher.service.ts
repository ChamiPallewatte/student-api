import { Inject, Injectable } from '@nestjs/common';
import { BufferedFile } from 'src/core/minio/file.model';
import { MinioClientService } from 'src/core/minio/minio-client.service';
import { IPaginatedEntity, IPagination } from 'src/core/pagination';
import { IRepositoryOption } from 'src/core/repository/interface';
import { CreateTeacherDto } from '../dto/create-teacher.dto';
import { TeacherFilterDto } from '../dto/filter-teacher.dto';
import { CreateStatus } from '../interfaces/create-status.interface';

import { ITeacher } from '../interfaces/teacher.interface';
import {
  ITeacherRepository,
  TeacherRepositoryInterface,
} from '../repositories/teacher-repository.interface';

@Injectable()
export class TeacherService {
  constructor(
    @Inject(`${TeacherRepositoryInterface}`)
    private readonly teacherRepository: ITeacherRepository,
    private minioClientService: MinioClientService,
  ) {}

  async create(
    createTeacherDto: CreateTeacherDto,
    image: BufferedFile,
  ): Promise<CreateStatus> {
    let uploaded_image = await this.minioClientService.upload(image);
    createTeacherDto.image = uploaded_image.url;
    let status: CreateStatus = {
      success: true,
      message: 'user created',
    };

    try {
      await this.teacherRepository.create(createTeacherDto);
    } catch (err) {
      status = {
        success: false,
        message: err,
      };
    }

    return status;
  }

  async findAll(
    filter: TeacherFilterDto,
    page: IPagination,
  ): Promise<IPaginatedEntity<ITeacher>> {
    const options: IRepositoryOption = {};
    return await this.teacherRepository.findAllWithPaginate(filter, page);
  }

  async findById(id: string): Promise<ITeacher> {
    return await this.teacherRepository.findById(id);
  }

  async delete(id: string) {
    return await this.teacherRepository.deleteById(id);
  }

  async update(id: string, data: CreateTeacherDto) {
    return await this.teacherRepository.findByIdAndUpdate(id, data);
  }
}
