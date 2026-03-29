import { AttendanceDto } from "@attendance/application/dto/attendance.dto";
import {
  Attendance,
  AttendanceStatus,
} from "@attendance/domain/models/attendance.entity";
import {
  ATTENDANCE_REPOSITORY,
  type AttendanceRepository,
} from "@attendance/domain/repositories/attendance-repository.interface";
import { Inject, Injectable } from "@nestjs/common";

@Injectable()
export class AttendanceService {
  constructor(
    @Inject(ATTENDANCE_REPOSITORY)
    private readonly attendanceRepository: AttendanceRepository,
  ) {}

  async register(dto: {
    studentId: string;
    lessonId: string;
    classOfferingId: string;
    status: AttendanceStatus;
  }): Promise<void> {
    const attendance = Attendance.restore(dto);
    await this.attendanceRepository.create(attendance!);
  }

  async findByStudentAndClassOffering(
    studentId: string,
    classOfferingId: string,
  ): Promise<AttendanceDto[]> {
    const records =
      await this.attendanceRepository.findByStudentAndClassOffering(
        studentId,
        classOfferingId,
      );
    return records.map((r) => AttendanceDto.from(r)!);
  }

  async findByClassOffering(classOfferingId: string): Promise<AttendanceDto[]> {
    const records =
      await this.attendanceRepository.findByClassOffering(classOfferingId);
    return records.map((r) => AttendanceDto.from(r)!);
  }
}
