import { pgEnum, pgTable, timestamp, uuid } from "drizzle-orm/pg-core";

export const attendanceStatusEnum = pgEnum("attendance_status", [
  "present",
  "absent",
]);

export const attendancesSchema = pgTable("attendances", {
  id: uuid("id").primaryKey().defaultRandom(),
  studentId: uuid("student_id").notNull(),
  lessonId: uuid("lesson_id").notNull(),
  classOfferingId: uuid("class_offering_id").notNull(),
  status: attendanceStatusEnum("status").notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).notNull(),
});
