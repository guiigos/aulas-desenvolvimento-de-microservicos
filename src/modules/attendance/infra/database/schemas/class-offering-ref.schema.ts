import { pgEnum, pgTable, uuid } from "drizzle-orm/pg-core";

export const classOfferingStatusEnum = pgEnum("class_offering_status", [
  "active",
  "inactive",
]);

export const classOfferingsSchema = pgTable("class_offerings", {
  id: uuid("id").primaryKey(),
  status: classOfferingStatusEnum("status").notNull(),
});
