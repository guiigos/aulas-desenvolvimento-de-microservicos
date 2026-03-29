import { TeacherDto } from "@academic/teachers/application/dto/teacher.dto";
import { Teacher } from "@academic/teachers/domain/models/teacher.entity";
import {
  TEACHER_REPOSITORY,
  type TeacherRepository,
} from "@academic/teachers/domain/repositories/teacher-repository.interface";
import {
  ConflictException,
  Inject,
  Injectable,
  NotFoundException,
} from "@nestjs/common";

@Injectable()
export class TeacherService {
  constructor(
    @Inject(TEACHER_REPOSITORY)
    private readonly teacherRepository: TeacherRepository,
  ) {}

  async create(dto: TeacherDto): Promise<void> {
    const existing = await this.teacherRepository.findByEmail(dto.email);

    if (existing) {
      throw new ConflictException("Email already registered");
    }

    const teacher = Teacher.restore(dto);
    await this.teacherRepository.create(teacher!);
  }

  async edit(id: string, dto: TeacherDto): Promise<void> {
    const teacher = await this.teacherRepository.findById(id);

    if (!teacher) {
      throw new NotFoundException("Teacher not found");
    }

    if (dto.email && dto.email !== teacher.email) {
      const existing = await this.teacherRepository.findByEmail(dto.email);

      if (existing) {
        throw new ConflictException("Email already registered");
      }
    }

    teacher
      .withName(dto.name)
      .withEmail(dto.email)
      .withDocument(dto.document)
      .withDegree(dto.degree)
      .withSpecialization(dto.specialization)
      .withAdmissionDate(dto.admissionDate);

    await this.teacherRepository.update(teacher);
  }

  async remove(id: string): Promise<void> {
    await this.teacherRepository.delete(id);
  }

  async list(): Promise<TeacherDto[]> {
    const response = await this.teacherRepository.findAll();
    return response.map((row) => TeacherDto.from(row)!);
  }

  async findById(id: string): Promise<TeacherDto | null> {
    const response = await this.teacherRepository.findById(id);
    return TeacherDto.from(response);
  }

  async findByEmail(email: string): Promise<TeacherDto | null> {
    const response = await this.teacherRepository.findByEmail(email);
    return TeacherDto.from(response);
  }
}
