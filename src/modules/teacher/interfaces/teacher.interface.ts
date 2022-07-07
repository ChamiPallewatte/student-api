import { IBaseModel } from 'src/core/model/base-model.interface';

export interface ITeacher extends IBaseModel {
  name: string;
  age: number;
  subject: string;
}

export interface ITeacherSchema extends Omit<ITeacher, 'id'> {}
