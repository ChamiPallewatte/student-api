import { IStudent } from '../interfaces/student.interface';
import { Student } from '../models/student.model';

export class viewStudentDto extends Student {
  formatDataSet(data: IStudent) {
    return {
      name: data.name,
      mathsMarks: data.mathsMarks,
      scienceMarks: data.scienceMarks,
      englishMarks: data.englishMarks,
    };
  }
}
