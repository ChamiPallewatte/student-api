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
  UseInterceptors,
} from '@nestjs/common';
import { ApiCreatedResponse, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ValidateObjectIdPipe } from 'src/core/filters/validate-object-id.pipe';
import { TransformInterceptor } from 'src/core/interceptors/transform.interceptor';
import { IPaginatedEntity, IPagination, Pager } from 'src/core/pagination';
import { CreateStudentDto } from '../dto/create-student.dto';
import { StudentFilterDto } from '../dto/filter-student.dto';
import { viewStudentDto } from '../dto/view-student.dto';
import { CreateStatus } from '../interfaces/create-status.interface';
import { IStudent } from '../interfaces/student.interface';
import { StudentService } from '../services/student.service';

@ApiTags('student')
@Controller('student')
export class StudentController {
  constructor(private readonly studentService: StudentService) {}

  @Post()
  @ApiCreatedResponse({ description: 'Create Student' })
  public async createStudent(
    @Body() createStudentDto: CreateStudentDto,
  ): Promise<CreateStatus> {
    const result: CreateStatus = await this.studentService.create(
      createStudentDto,
    );
    if (!result.success) {
      throw new HttpException(result.message, HttpStatus.BAD_REQUEST);
    }
    return result;
  }

  @Get()
  @ApiCreatedResponse({ description: 'Student GetAll' })
  @UseInterceptors(new TransformInterceptor(new viewStudentDto()))
  async findAll(
    @Query() filter: StudentFilterDto,
    @Pager() page: IPagination,
  ): Promise<IPaginatedEntity<IStudent>> {
    return await this.studentService.findAll(filter, page);
  }

  @Get(':id')
  @ApiResponse({ description: 'Get student using id' })
  @UseInterceptors(new TransformInterceptor(new viewStudentDto()))
  async findById(@Param('id', new ValidateObjectIdPipe()) id: string) {
    return await this.studentService.findById(id);
  }

  @Put(':id')
  @ApiResponse({ description: 'Student Update' })
  @UseInterceptors(new TransformInterceptor(new viewStudentDto()))
  async update(
    @Param('id', new ValidateObjectIdPipe()) id: string,
    @Body() data: CreateStudentDto,
  ) {
    return await this.studentService.update(id, data);
  }

  @Delete(':id')
  @ApiResponse({ description: 'Student Delete' })
  async delete(@Param('id', new ValidateObjectIdPipe()) id: string) {
    return await this.studentService.delete(id);
  }
}
