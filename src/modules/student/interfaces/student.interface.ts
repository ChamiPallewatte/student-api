import { IBaseModel } from 'src/core/model/base-model.interface';
import { ITeacher } from 'src/modules/teacher/interfaces/teacher.interface';

export interface IStudent extends IBaseModel {
  name: string;
  mathsMarks: number;
  scienceMarks: number;
  englishMarks: number;
  teacherArray: ITeacher[];
}

export interface IStudentSchema extends Omit<IStudent, 'id'> {}
