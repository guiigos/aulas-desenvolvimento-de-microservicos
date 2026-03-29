import type { Teacher } from "@academic/teachers/domain/models/teacher.entity";

export class TeacherDto {
  private constructor(
    public name: string,
    public email: string,
    public document: string,
    public degree: string,
    public specialization: string,
    public admissionDate: Date,
  ) {}

  public static from(teacher: Teacher | null): TeacherDto | null {
    if (!teacher) return null;
    return new TeacherDto(
      teacher.name,
      teacher.email,
      teacher.document,
      teacher.degree,
      teacher.specialization,
      teacher.admissionDate,
    );
  }
}
