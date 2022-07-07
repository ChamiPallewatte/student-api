import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  Inject,
  HttpException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface Response<T> {
  data: T;
}

@Injectable()
export class TransformInterceptor<T>
  implements NestInterceptor<T, Response<T>>
{
  constructor(@Inject() private readonly entityClass: any) {}
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<Response<T>> {
    return next.handle().pipe(
      map((data) => {
        if (data == null) {
          throw new HttpException('Result not found', 404);
        }
        if (Array.isArray(data)) {
          return data.map((_data) => this.entityClass.formatDataSet(_data));
        }

        if (data.hasOwnProperty('data')) {
          const tmpData = data.data;
          data.data = tmpData.map((_data) =>
            this.entityClass.formatDataSet(_data),
          );

          return data;
        }

        return this.entityClass.formatDataSet(data);
      }),
    );
  }
}
