import { NotFoundException } from '@nestjs/common';
import { Model, QueryOptions } from 'mongoose';
import { IPagination, IPaginatedEntity } from '../pagination';
import { IBaseRepository, IRepositoryOption } from './interface';
import { IBaseModel } from './model/base-model.interface';

export abstract class BaseRepository<T extends IBaseModel>
  implements IBaseRepository<T>
{
  private _model: Model<T>;
  constructor(schemaModel: Model<T>) {
    this._model = schemaModel;
  }

  private prepareQuery(query: any, withTrashed = false) {
    if (query) {
      delete query.page;
      delete query.limit;
    }
    if (!withTrashed) {
      query['deletedAt'] = null;
    }
    return query;
  }

  async getCount(query: any): Promise<number> {
    return await this._model.countDocuments(query);
  }

  async getPageInfo<T>(query: any, page: IPagination): Promise<IPagination> {
    page = !page ? {} : page;
    page.totalCount = await this.getCount(query);
    page.totalPages = page.limit ? Math.ceil(page.totalCount / page.limit) : 1;
    return page;
  }

  async create(data: T): Promise<T> {
    if (!data.createdAt) {
      data['createdAt'] = new Date();
    }
    return await this._model.create<T>(data);
  }

  async findById(id: string, options?: IRepositoryOption): Promise<T> {
    const projection = (options && options.projection) || {};
    const paramOptions: QueryOptions = {};
    if (options) {
      if (options.relation) {
        paramOptions.populate = options.relation;
      }
    }
    return await this._model.findById(id, projection, paramOptions);
  }

  async findOne(query?: any, options?: IRepositoryOption): Promise<T> {
    const projection = (options && options.projection) || {};
    const paramOptions: QueryOptions = {};
    if (options) {
      if (options.relation) {
        paramOptions.populate = options.relation;
      }
    }
    return await this._model.findOne(query, projection, paramOptions);
  }

  async findAll(query?: any, options?: IRepositoryOption): Promise<T[]> {
    const projection = (options && options.projection) || {};
    const paramOptions: QueryOptions = {};
    if (options) {
      if (options.relation) {
        paramOptions.populate = options.relation;
      }
      if (options.sort) {
        paramOptions.sort = options.sort;
      }
    }
    return await this._model.find(
      this.prepareQuery(query),
      projection,
      paramOptions,
    );
  }

  async findAllWithPaginate(
    query?: any,
    options?: IRepositoryOption,
    page?: IPagination,
  ): Promise<IPaginatedEntity<T>> {
    const projection = (options && options.projection) || {};
    const paramOptions: QueryOptions = {};
    if (options) {
      if (options.relation) {
        paramOptions.populate = options.relation;
      }
      if (options.sort) {
        paramOptions.sort = options.sort;
      }
      if (page) {
        paramOptions.limit = page.limit;
        paramOptions.skip = page.skip;
      }
    }
    const finalQuery = this.prepareQuery(query);
    const docs = await this._model.find(finalQuery, projection, paramOptions);
    const pageInfo = await this.getPageInfo(finalQuery, page);
    return { data: docs, ...pageInfo };
  }

  async deleteById(id: string): Promise<boolean> {
    const entity = await this._model.findById(id);
    if (!entity) {
      throw new NotFoundException();
    }
    entity['deletedAt'] = new Date();
    const d = await entity.save();
    return d ? true : false;
  }

  async findByIdAndUpdate(id: string, data: any): Promise<T> {
    data.updatedAt = Date.now();
    return await this._model.findByIdAndUpdate(id, data, { new: true });
  }
}
