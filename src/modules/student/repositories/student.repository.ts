import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BaseRepository } from 'src/core/repository/base.repository';
import { IStudentSchema } from '../interfaces/student.interface';
import { StudentMongoSchema } from '../schema/student.schema';
import { IStudentRepository } from './student-repository.interface';

@Injectable()
export class StudentRepository
  extends BaseRepository<IStudentSchema>
  implements IStudentRepository
{
  constructor(
    @InjectModel(StudentMongoSchema.name)
    private readonly repo: Model<IStudentSchema>,
  ) {
    super(repo);
  }
}
