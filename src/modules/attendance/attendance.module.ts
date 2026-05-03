import { AttendanceService } from "@attendance/application/services/attendance.service";
import { ATTENDANCE_REPOSITORY } from "@attendance/domain/repositories/attendance-repository.interface";
import { AttendancesController } from "@attendance/infra/controllers/attendances.controller";
import { DrizzleAttendanceRepository } from "@attendance/infra/repositories/drizzle-attendance.repository";
import { MessagingModule } from "@attendance/messaging/messaging.module";
import { Module } from "@nestjs/common";
import { SharedModule } from "@shared/shared.module";

@Module({
  imports: [SharedModule, MessagingModule],
  controllers: [AttendancesController],
  providers: [
    AttendanceService,
    DrizzleAttendanceRepository,
    {
      provide: ATTENDANCE_REPOSITORY,
      useExisting: DrizzleAttendanceRepository,
    },
  ],
})
export class AttendanceModule {}
