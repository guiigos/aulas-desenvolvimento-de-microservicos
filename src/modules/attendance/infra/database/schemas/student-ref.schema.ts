import { pgTable, text, uuid } from "drizzle-orm/pg-core";

export const studentsSchema = pgTable("students", {
  id: uuid("id").primaryKey(),
  name: text("name").notNull(),
});
