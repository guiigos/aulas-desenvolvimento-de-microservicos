import type { Attendance } from "@attendance/domain/models/attendance.entity";

export class AttendanceDto {
  private constructor(
    public studentId: string,
    public lessonId: string,
    public classOfferingId: string,
    public status: string,
  ) {}

  public static from(attendance: Attendance | null): AttendanceDto | null {
    if (!attendance) return null;
    return new AttendanceDto(
      attendance.studentId,
      attendance.lessonId,
      attendance.classOfferingId,
      attendance.status,
    );
  }
}
