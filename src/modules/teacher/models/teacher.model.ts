import { ITeacher } from '../interfaces/teacher.interface';

export class Teacher implements ITeacher {
  id?: string;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
  name: string;
  age: number;
  subject: string;
  imgURL: string;
}
