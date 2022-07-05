import { IStudent } from '../interfaces/student.interface';

export class Student implements IStudent {
  id?: string;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
  name: string;
  mathsMarks: number;
  scienceMarks: number;
  englishMarks: number;
}
