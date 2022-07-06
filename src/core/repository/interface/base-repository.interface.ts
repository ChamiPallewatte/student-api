import { IPaginatedEntity, IPagination } from 'src/core/pagination';
import { IRepositoryOption } from './base-repository-options.interface';

export interface IBaseRepository<T> {
  create(data: T): Promise<T>;

  findById(id: string, options?: IRepositoryOption): Promise<T>;

  findOne(query?: any, options?: IRepositoryOption): Promise<T>;

  findAll(query?: any, options?: IRepositoryOption): Promise<T[]>;

  findAllWithPaginate(
    query?: any,
    options?: IRepositoryOption,
    page?: IPagination,
  ): Promise<IPaginatedEntity<T>>;

  deleteById(id: string): Promise<boolean>;

  findByIdAndUpdate(id: string, data: T | any): Promise<T>;
}
