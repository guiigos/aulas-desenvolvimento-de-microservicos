import type { AttendanceStatus } from "@attendance/domain/models/attendance.entity";

export interface AttendanceRegisteredEvent {
  id: string;
  studentId: string;
  lessonId: string;
  classOfferingId: string;
  status: AttendanceStatus;
  registeredAt: string;
}
