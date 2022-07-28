import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Put,
  Query,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiCreatedResponse, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ValidateObjectIdPipe } from 'src/core/filters/validate-object-id.pipe';
import { TransformInterceptor } from 'src/core/interceptors/transform.interceptor';
import { BufferedFile } from 'src/core/minio/file.model';
import { IPaginatedEntity, IPagination, Pager } from 'src/core/pagination';
import { CreateTeacherDto } from '../dto/create-teacher.dto';
import { TeacherFilterDto } from '../dto/filter-teacher.dto';
import { viewTeacherDto } from '../dto/view-teacher.dto';
import { CreateStatus } from '../interfaces/create-status.interface';
import { ITeacher } from '../interfaces/teacher.interface';
import { TeacherService } from '../services/teacher.service';

@ApiTags('teacher')
@Controller('teacher')
export class TeacherController {
  constructor(private readonly teacherService: TeacherService) {}

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  @ApiCreatedResponse({ description: 'Create teacher' })
  public async createTeacher(
    @Body() createTeacherDto: CreateTeacherDto,
    @UploadedFile() file: BufferedFile,
  ): Promise<CreateStatus> {
    const result: CreateStatus = await this.teacherService.create(
      createTeacherDto,
      file,
    );
    if (!result.success) {
      throw new HttpException(result.message, HttpStatus.BAD_REQUEST);
    }
    return result;
  }

  @Get()
  @ApiCreatedResponse({ description: 'Teacher GetAll' })
  @UseInterceptors(new TransformInterceptor(new viewTeacherDto()))
  async findAll(
    @Query() filter: TeacherFilterDto,
    @Pager() page: IPagination,
  ): Promise<IPaginatedEntity<ITeacher>> {
    return await this.teacherService.findAll(filter, page);
  }

  @Get(':id')
  @ApiResponse({ description: 'Get teacher using id' })
  @UseInterceptors(new TransformInterceptor(new viewTeacherDto()))
  async findById(@Param('id', new ValidateObjectIdPipe()) id: string) {
    return await this.teacherService.findById(id);
  }

  @Put(':id')
  @ApiResponse({ description: 'Teacher Update' })
  @UseInterceptors(new TransformInterceptor(new viewTeacherDto()))
  async update(
    @Param('id', new ValidateObjectIdPipe()) id: string,
    @Body() data: CreateTeacherDto,
  ) {
    return await this.teacherService.update(id, data);
  }

  @Delete(':id')
  @ApiResponse({ description: 'Teacher Delete' })
  async delete(@Param('id', new ValidateObjectIdPipe()) id: string) {
    return await this.teacherService.delete(id);
  }
}
