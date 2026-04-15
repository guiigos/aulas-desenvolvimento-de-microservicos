import {
  attendanceStatusEnum,
  attendancesSchema,
} from "@attendance/infra/database/schemas/attendance.schema";
import {
  classOfferingStatusEnum,
  classOfferingsSchema,
} from "@attendance/infra/database/schemas/class-offering-ref.schema";
import {
  enrollmentStatusEnum,
  enrollmentsSchema,
} from "@attendance/infra/database/schemas/enrollment-ref.schema";
import { lessonsSchema } from "@attendance/infra/database/schemas/lesson-ref.schema";
import { studentsSchema } from "@attendance/infra/database/schemas/student-ref.schema";
import { Injectable, type OnModuleDestroy } from "@nestjs/common";
import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";

const schema = {
  attendancesSchema,
  attendanceStatusEnum,
  studentsSchema,
  lessonsSchema,
  classOfferingsSchema,
  classOfferingStatusEnum,
  enrollmentsSchema,
  enrollmentStatusEnum,
};

@Injectable()
export class DrizzleService implements OnModuleDestroy {
  private readonly pool: Pool;
  public readonly db;

  constructor() {
    this.pool = new Pool({
      connectionString: process.env.DATABASE_URL,
    });

    this.db = drizzle(this.pool, { schema });
  }

  async onModuleDestroy() {
    await this.pool.end();
  }
}
