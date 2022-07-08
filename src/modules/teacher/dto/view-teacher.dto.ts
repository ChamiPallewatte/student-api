import { ITeacher } from '../interfaces/teacher.interface';
import { Teacher } from '../models/teacher.model';

export class viewTeacherDto extends Teacher {
  formatDataSet(data: ITeacher) {
    return {
      name: data.name,
      age: data.age,
      subject: data.subject,
      imgURL: data.imgURL,
    };
  }
}
