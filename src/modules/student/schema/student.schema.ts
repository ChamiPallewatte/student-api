import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { BaseSchema } from 'src/core/repository/schema';

export type StudentDocument = StudentMongoSchema & Document;

@Schema({ collection: 'students' })
export class StudentMongoSchema extends BaseSchema {
  @Prop()
  name: String;

  @Prop()
  mathsMarks: Number;

  @Prop()
  scienceMarks: Number;

  @Prop()
  englishMarks: Number;

  @Prop()
  sort: Boolean;
}

export const StudentSchema = SchemaFactory.createForClass(StudentMongoSchema);
