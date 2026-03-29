import { TeacherDto } from "@academic/teachers/application/dto/teacher.dto";
import { TeacherService } from "@academic/teachers/application/services/teacher.service";
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from "@nestjs/common";

@Controller("teachers")
export class TeachersController {
  constructor(private readonly teacherService: TeacherService) {}

  @Get()
  async findAll() {
    return this.teacherService.list();
  }

  @Get(":id")
  async findById(@Param("id") id: string) {
    return this.teacherService.findById(id);
  }

  @Post()
  async create(@Body() body: TeacherDto) {
    return this.teacherService.create(body);
  }

  @Put(":id")
  async update(@Param("id") id: string, @Body() body: TeacherDto) {
    return this.teacherService.edit(id, body);
  }

  @Delete(":id")
  async remove(@Param("id") id: string) {
    return this.teacherService.remove(id);
  }
}
