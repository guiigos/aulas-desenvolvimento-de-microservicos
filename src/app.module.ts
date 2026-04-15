import { AttendanceModule } from "@attendance/attendance.module";
import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { SharedModule } from "@shared/shared.module";

@Module({
  imports: [
    ConfigModule.forRoot(),
    SharedModule,
    AttendanceModule,
  ],
})
export class AppModule {}
