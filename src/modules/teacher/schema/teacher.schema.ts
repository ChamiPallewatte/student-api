import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { BaseSchema } from 'src/core/repository/schema/base.schema';

export type TeacherDocument = TeacherMongoSchema & Document;

@Schema({ collection: 'teacher' })
export class TeacherMongoSchema extends BaseSchema {
  @Prop()
  name: String;

  @Prop()
  age: Number;

  @Prop()
  subject: String;

  @Prop()
  sort: Boolean;
}

export const TeacherSchema = SchemaFactory.createForClass(TeacherMongoSchema);
