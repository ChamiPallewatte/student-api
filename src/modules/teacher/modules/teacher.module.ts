import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TeacherMongoSchema, TeacherSchema } from '../schema/teacher.schema';
import { TeacherController } from '../controller/teacher.controller';
import { TeacherRepositoryInterface } from '../repositories/teacher-repository.interface';
import { TeacherRepository } from '../repositories/teacher.repository';
import { TeacherService } from '../services/teacher.service';
import { MinioClientModule } from 'src/core/minio/minio-client.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: TeacherMongoSchema.name, schema: TeacherSchema },
    ]),
    MinioClientModule,
  ],
  controllers: [TeacherController],
  providers: [
    {
      provide: TeacherRepositoryInterface,
      useClass: TeacherRepository,
    },

    TeacherService,
  ],
  exports: [
    {
      provide: TeacherRepositoryInterface,
      useClass: TeacherRepository,
    },
    TeacherService,
  ],
})
export class TeacherModule {}
