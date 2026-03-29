import { pgTable, text, timestamp, uuid, varchar } from "drizzle-orm/pg-core";

export const teachersSchema = pgTable("teachers", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  document: varchar("document", { length: 20 }).notNull().unique(),
  degree: varchar("degree", { length: 100 }).notNull(),
  specialization: varchar("specialization", { length: 100 }).notNull(),
  admissionDate: timestamp("admission_date", { withTimezone: true }).notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).notNull(),
});
