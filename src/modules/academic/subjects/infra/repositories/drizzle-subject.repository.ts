import { Subject } from "@academic/subjects/domain/models/subject.entity";
import type { SubjectRepository } from "@academic/subjects/domain/repositories/subject-repository.interface";
import { subjectsSchema } from "@academic/subjects/infra/database/schemas/subject.schema";
import { Injectable } from "@nestjs/common";
import { DrizzleService } from "@shared/infra/database/drizzle.service";
import { eq } from "drizzle-orm";

@Injectable()
export class DrizzleSubjectRepository implements SubjectRepository {
  constructor(private readonly drizzleService: DrizzleService) {}

  async create(subject: Subject): Promise<void> {
    await this.drizzleService.db.insert(subjectsSchema).values({
      name: subject.name,
      code: subject.code,
      workload: subject.workload,
      description: subject.description,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  }

  async update(subject: Subject): Promise<void> {
    await this.drizzleService.db
      .update(subjectsSchema)
      .set({
        name: subject.name,
        code: subject.code,
        workload: subject.workload,
        description: subject.description,
        updatedAt: new Date(),
      })
      .where(eq(subjectsSchema.id, subject.id!));
  }

  async delete(id: string): Promise<void> {
    await this.drizzleService.db
      .delete(subjectsSchema)
      .where(eq(subjectsSchema.id, id));
  }

  async findById(id: string): Promise<Subject | null> {
    const result = await this.drizzleService.db
      .select()
      .from(subjectsSchema)
      .where(eq(subjectsSchema.id, id))
      .limit(1);

    return Subject.restore(result[0]);
  }

  async findByCode(code: string): Promise<Subject | null> {
    const result = await this.drizzleService.db
      .select()
      .from(subjectsSchema)
      .where(eq(subjectsSchema.code, code.toUpperCase()))
      .limit(1);

    return Subject.restore(result[0]);
  }

  async findAll(): Promise<Subject[]> {
    const rows = await this.drizzleService.db.select().from(subjectsSchema);
    return rows.map((row) => Subject.restore(row)!);
  }
}
