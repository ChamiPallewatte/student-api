import { ITeacher } from '../interfaces/teacher.interface';
import { Teacher } from '../models/teacher.model';

export class viewTeacherDto extends Teacher {
  formatDataSet(data: ITeacher) {
    return {
      id: data.id,
      name: data.name,
      age: data.age,
      subject: data.subject,
      image: data.image,
    };
  }
}
