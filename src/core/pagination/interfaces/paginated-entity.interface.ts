import { IPagination } from './page.interface';

export interface IPaginatedEntity<T> extends IPagination {
  data: T[];
}
