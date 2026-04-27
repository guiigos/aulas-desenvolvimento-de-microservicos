import type { StudentRefRepository } from "@attendance/domain/repositories/student-ref-repository.interface";
import { studentsSchema } from "@attendance/infra/database/schemas/student-ref.schema";
import { Injectable } from "@nestjs/common";
import { DrizzleService } from "@shared/infra/database/drizzle.service";
import { eq } from "drizzle-orm";

@Injectable()
export class DrizzleStudentRefRepository implements StudentRefRepository {
  constructor(private readonly drizzleService: DrizzleService) {}

  async upsert(student: { id: string; name: string }): Promise<void> {
    await this.drizzleService.db
      .insert(studentsSchema)
      .values({ id: student.id, name: student.name })
      .onConflictDoUpdate({
        target: studentsSchema.id,
        set: { name: student.name },
      });
  }

  async deleteById(id: string): Promise<void> {
    await this.drizzleService.db
      .delete(studentsSchema)
      .where(eq(studentsSchema.id, id));
  }
}
