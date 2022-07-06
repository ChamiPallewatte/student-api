import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { IPagination } from '../interfaces/page.interface';

export const Pager = createParamDecorator(
  (data: any, ctx: ExecutionContext): IPagination => {
    const req = ctx.switchToHttp().getRequest();
    if (req.query) {
      const query: IPagination = req.query;
      const p = +query.page;
      const q = +query.limit;
      const page: number = p ? p : 1;
      const limit: number = q ? q : 10;
      return { page, limit, skip: (page - 1) * limit };
    }
    return { page: 1, limit: 10, skip: 0 };
  },
);
