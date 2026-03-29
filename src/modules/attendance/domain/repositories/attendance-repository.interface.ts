import type { Attendance } from "@attendance/domain/models/attendance.entity";

export const ATTENDANCE_REPOSITORY = Symbol("ATTENDANCE_REPOSITORY");

export interface AttendanceRepository {
  create(attendance: Attendance): Promise<void>;
  findByStudentAndClassOffering(
    studentId: string,
    classOfferingId: string,
  ): Promise<Attendance[]>;
  findByClassOffering(classOfferingId: string): Promise<Attendance[]>;
}
