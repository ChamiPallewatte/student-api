import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BaseRepository } from 'src/core/repository/base.repository';
import { ITeacherSchema } from '../interfaces/teacher.interface';
import { TeacherMongoSchema } from '../schema/teacher.schema';
import { ITeacherRepository } from './teacher-repository.interface';

@Injectable()
export class TeacherRepository
  extends BaseRepository<ITeacherSchema>
  implements ITeacherRepository
{
  constructor(
    @InjectModel(TeacherMongoSchema.name)
    private readonly repo: Model<ITeacherSchema>,
  ) {
    super(repo);
  }
}
