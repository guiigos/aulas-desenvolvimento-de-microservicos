import { AttendanceDto } from "@attendance/application/dto/attendance.dto";
import {
  Attendance,
  type AttendanceStatus,
} from "@attendance/domain/models/attendance.entity";
import {
  ATTENDANCE_REPOSITORY,
  type AttendanceRepository,
} from "@attendance/domain/repositories/attendance-repository.interface";
import { MessagingPublisherService } from "@attendance/messaging/application/services/messaging-publisher.service";
import { Inject, Injectable } from "@nestjs/common";
import type { PaginatedResult } from "@shared/infra/hateoas";

@Injectable()
export class AttendanceService {
  constructor(
    @Inject(ATTENDANCE_REPOSITORY)
    private readonly attendanceRepository: AttendanceRepository,
    private readonly messagingPublisher: MessagingPublisherService,
  ) {}

  async register(dto: {
    studentId: string;
    lessonId: string;
    classOfferingId: string;
    status: AttendanceStatus;
  }): Promise<void> {
    const attendance = Attendance.restore(dto);
    const saved = await this.attendanceRepository.create(attendance!);

    await this.messagingPublisher.publishAttendanceRegistered({
      id: saved.id!,
      studentId: saved.studentId,
      lessonId: saved.lessonId,
      classOfferingId: saved.classOfferingId,
      status: saved.status,
      registeredAt: (saved.createdAt ?? new Date()).toISOString(),
    });
  }

  async findByStudentAndClassOffering(
    studentId: string,
    classOfferingId: string,
  ): Promise<PaginatedResult<AttendanceDto>> {
    const records =
      await this.attendanceRepository.findByStudentAndClassOffering(
        studentId,
        classOfferingId,
      );
    const data = records.map((r) => AttendanceDto.from(r)!);
    return { data, total: data.length, page: 1, limit: data.length || 1 };
  }

  async findByClassOffering(
    classOfferingId: string,
  ): Promise<PaginatedResult<AttendanceDto>> {
    const records =
      await this.attendanceRepository.findByClassOffering(classOfferingId);
    const data = records.map((r) => AttendanceDto.from(r)!);
    return { data, total: data.length, page: 1, limit: data.length || 1 };
  }
}
