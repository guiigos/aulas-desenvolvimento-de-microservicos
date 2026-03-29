import { StudentsModule } from "@academic/students/students.module";
import { SubjectsModule } from "@academic/subjects/subjects.module";
import { TeachersModule } from "@academic/teachers/teachers.module";
import { Module } from "@nestjs/common";

@Module({
  imports: [StudentsModule, SubjectsModule, TeachersModule],
})
export class AcademicModule {}
