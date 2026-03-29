import { TeacherService } from "@academic/teachers/application/services/teacher.service";
import { TEACHER_REPOSITORY } from "@academic/teachers/domain/repositories/teacher-repository.interface";
import { TeachersController } from "@academic/teachers/infra/controllers/teachers.controller";
import { DrizzleTeacherRepository } from "@academic/teachers/infra/repositories/drizzle-teacher.repository";
import { Module } from "@nestjs/common";
import { SharedModule } from "@shared/shared.module";

@Module({
  imports: [SharedModule],
  controllers: [TeachersController],
  providers: [
    TeacherService,
    DrizzleTeacherRepository,
    {
      provide: TEACHER_REPOSITORY,
      useExisting: DrizzleTeacherRepository,
    },
  ],
})
export class TeachersModule {}
