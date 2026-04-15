import { pgTable, uuid } from "drizzle-orm/pg-core";

export const lessonsSchema = pgTable("lessons", {
  id: uuid("id").primaryKey(),
  classOfferingId: uuid("class_offering_id").notNull(),
});
