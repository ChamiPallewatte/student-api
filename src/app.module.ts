import { Module } from '@nestjs/common';
import { DatabaseModule } from './config/database.config';
import { StudentModule } from './modules/student/modules/student.module';

@Module({
  imports: [DatabaseModule, StudentModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
