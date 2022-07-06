import { IBaseRepository } from 'src/core/repository/interface';
import { IStudentSchema } from '../interfaces/student.interface';

export const StudentRepositoryInterface = 'IUserRepository';
export interface IStudentRepository extends IBaseRepository<IStudentSchema> {}
