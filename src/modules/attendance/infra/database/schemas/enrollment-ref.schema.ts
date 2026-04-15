import { pgEnum, pgTable, uuid } from "drizzle-orm/pg-core";

export const enrollmentStatusEnum = pgEnum("enrollment_status", [
  "active",
  "canceled",
]);

export const enrollmentsSchema = pgTable("enrollments", {
  id: uuid("id").primaryKey(),
  studentId: uuid("student_id").notNull(),
  classOfferingId: uuid("class_offering_id").notNull(),
  status: enrollmentStatusEnum("status").notNull(),
});
