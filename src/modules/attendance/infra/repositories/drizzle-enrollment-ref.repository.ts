import type {
  EnrollmentRefRepository,
  EnrollmentRefStatus,
} from "@attendance/domain/repositories/enrollment-ref-repository.interface";
import { enrollmentsSchema } from "@attendance/infra/database/schemas/enrollment-ref.schema";
import { Injectable } from "@nestjs/common";
import { DrizzleService } from "@shared/infra/database/drizzle.service";
import { eq } from "drizzle-orm";

@Injectable()
export class DrizzleEnrollmentRefRepository
  implements EnrollmentRefRepository
{
  constructor(private readonly drizzleService: DrizzleService) {}

  async upsert(enrollment: {
    id: string;
    studentId: string;
    classOfferingId: string;
    status: EnrollmentRefStatus;
  }): Promise<void> {
    await this.drizzleService.db
      .insert(enrollmentsSchema)
      .values({
        id: enrollment.id,
        studentId: enrollment.studentId,
        classOfferingId: enrollment.classOfferingId,
        status: enrollment.status,
      })
      .onConflictDoUpdate({
        target: enrollmentsSchema.id,
        set: {
          studentId: enrollment.studentId,
          classOfferingId: enrollment.classOfferingId,
          status: enrollment.status,
        },
      });
  }

  async cancelById(id: string): Promise<void> {
    await this.drizzleService.db
      .update(enrollmentsSchema)
      .set({ status: "canceled" })
      .where(eq(enrollmentsSchema.id, id));
  }
}
