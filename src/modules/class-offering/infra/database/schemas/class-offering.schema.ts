import { pgEnum, pgTable, timestamp, uuid } from "drizzle-orm/pg-core";

export const classOfferingStatusEnum = pgEnum("class_offering_status", [
  "active",
  "inactive",
]);

export const classOfferingsSchema = pgTable("class_offerings", {
  id: uuid("id").primaryKey().defaultRandom(),
  subjectId: uuid("subject_id").notNull(),
  teacherId: uuid("teacher_id").notNull(),
  startDate: timestamp("start_date", { withTimezone: true }).notNull(),
  endDate: timestamp("end_date", { withTimezone: true }).notNull(),
  status: classOfferingStatusEnum("status").notNull().default("active"),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).notNull(),
});
