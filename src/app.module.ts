import { Module } from '@nestjs/common';
import { DatabaseModule } from './config/database.config';
import { StudentModule } from './modules/student/modules/student.module';
import { TeacherModule } from './modules/teacher/modules/teacher.module';

@Module({
  imports: [DatabaseModule, StudentModule, TeacherModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
