import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { StudentController } from '../controllers/student.controller';
import { StudentRepositoryInterface } from '../repositories/student-repository.interface';
import { StudentRepository } from '../repositories/student.repository';
import { StudentMongoSchema, StudentSchema } from '../schema/student.schema';
import { StudentService } from '../services/student.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: StudentMongoSchema.name, schema: StudentSchema },
    ]),
  ],
  controllers: [StudentController],
  providers: [
    {
      provide: StudentRepositoryInterface,
      useClass: StudentRepository,
    },

    StudentService,
  ],
  exports: [
    {
      provide: StudentRepositoryInterface,
      useClass: StudentRepository,
    },
    StudentService,
  ],
})
export class StudentModule {}
