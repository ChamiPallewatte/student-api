import { IBaseRepository } from 'src/core/repository/interface';
import { ITeacherSchema } from '../interfaces/teacher.interface';

export const TeacherRepositoryInterface = 'ITeacherRepository';
export interface ITeacherRepository extends IBaseRepository<ITeacherSchema> {}
