import { IBaseModel } from 'src/core/model/base-model.interface';

export interface IStudent extends IBaseModel {
  name: string;
  mathsMarks: number;
  scienceMarks: number;
  englishMarks: number;
}

export interface IStudentSchema extends Omit<IStudent, 'id'> {}
