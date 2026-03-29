import { AttendanceService } from "@attendance/application/services/attendance.service";
import { AttendanceStatus } from "@attendance/domain/models/attendance.entity";
import { Body, Controller, Get, Param, Post } from "@nestjs/common";

@Controller("attendances")
export class AttendancesController {
  constructor(private readonly attendanceService: AttendanceService) {}

  @Get("student/:studentId/class-offering/:classOfferingId")
  async findByStudent(
    @Param("studentId") studentId: string,
    @Param("classOfferingId") classOfferingId: string,
  ) {
    return this.attendanceService.findByStudentAndClassOffering(
      studentId,
      classOfferingId,
    );
  }

  @Get("class-offering/:classOfferingId")
  async findByClassOffering(@Param("classOfferingId") classOfferingId: string) {
    return this.attendanceService.findByClassOffering(classOfferingId);
  }

  @Post()
  async register(
    @Body() body: {
      studentId: string;
      lessonId: string;
      classOfferingId: string;
      status: AttendanceStatus;
    },
  ) {
    return this.attendanceService.register(body);
  }
}
