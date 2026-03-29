import { SubjectDto } from "@academic/subjects/application/dto/subject.dto";
import { SubjectService } from "@academic/subjects/application/services/subject.service";
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from "@nestjs/common";

@Controller("subjects")
export class SubjectsController {
  constructor(private readonly subjectService: SubjectService) {}

  @Get()
  async findAll() {
    return this.subjectService.list();
  }

  @Get(":id")
  async findById(@Param("id") id: string) {
    return this.subjectService.findById(id);
  }

  @Post()
  async create(@Body() body: SubjectDto) {
    return this.subjectService.create(body);
  }

  @Put(":id")
  async update(@Param("id") id: string, @Body() body: SubjectDto) {
    return this.subjectService.edit(id, body);
  }

  @Delete(":id")
  async remove(@Param("id") id: string) {
    return this.subjectService.remove(id);
  }
}
