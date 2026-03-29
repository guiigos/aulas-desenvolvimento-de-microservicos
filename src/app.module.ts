import { AcademicModule } from "@academic/academic.module";
import { AttendanceModule } from "@attendance/attendance.module";
import { ClassOfferingModule } from "@class-offering/class-offering.module";
import { EnrollmentModule } from "@enrollment/enrollment.module";
import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { SharedModule } from "@shared/shared.module";

@Module({
  imports: [
    ConfigModule.forRoot(),
    SharedModule,
    AcademicModule,
    AttendanceModule,
    ClassOfferingModule,
    EnrollmentModule,
  ],
})
export class AppModule {}
