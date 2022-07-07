import {
  ArgumentMetadata,
  BadRequestException,
  PipeTransform,
} from '@nestjs/common';
import { Types } from 'mongoose';

export class ValidateObjectIdPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    const isValid = Types.ObjectId.isValid(value);
    if (!isValid) throw new BadRequestException('Invalid id!');
    return value;
  }
}
