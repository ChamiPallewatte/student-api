import { Module } from '@nestjs/common';
import { DatabaseModule } from './config/database.config';

@Module({
  imports: [DatabaseModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
