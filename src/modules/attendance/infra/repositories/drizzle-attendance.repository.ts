import {
  Attendance,
  AttendanceStatus,
} from "@attendance/domain/models/attendance.entity";
import type { AttendanceRepository } from "@attendance/domain/repositories/attendance-repository.interface";
import { attendancesSchema } from "@attendance/infra/database/schemas/attendance.schema";
import { Injectable } from "@nestjs/common";
import { DrizzleService } from "@shared/infra/database/drizzle.service";
import { and, eq } from "drizzle-orm";

@Injectable()
export class DrizzleAttendanceRepository implements AttendanceRepository {
  constructor(private readonly drizzleService: DrizzleService) {}

  async create(attendance: Attendance): Promise<void> {
    await this.drizzleService.db.insert(attendancesSchema).values({
      studentId: attendance.studentId,
      lessonId: attendance.lessonId,
      classOfferingId: attendance.classOfferingId,
      status: attendance.status,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  }

  async findByStudentAndClassOffering(
    studentId: string,
    classOfferingId: string,
  ): Promise<Attendance[]> {
    const rows = await this.drizzleService.db
      .select()
      .from(attendancesSchema)
      .where(
        and(
          eq(attendancesSchema.studentId, studentId),
          eq(attendancesSchema.classOfferingId, classOfferingId),
        ),
      );

    return rows.map(
      (row) =>
        Attendance.restore({
          ...row,
          status: row.status as AttendanceStatus,
        })!,
    );
  }

  async findByClassOffering(classOfferingId: string): Promise<Attendance[]> {
    const rows = await this.drizzleService.db
      .select()
      .from(attendancesSchema)
      .where(eq(attendancesSchema.classOfferingId, classOfferingId));

    return rows.map(
      (row) =>
        Attendance.restore({
          ...row,
          status: row.status as AttendanceStatus,
        })!,
    );
  }
}
