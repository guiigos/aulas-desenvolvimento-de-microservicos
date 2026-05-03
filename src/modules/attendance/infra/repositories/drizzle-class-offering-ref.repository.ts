import type {
  ClassOfferingRefRepository,
  ClassOfferingRefStatus,
} from "@attendance/domain/repositories/class-offering-ref-repository.interface";
import { classOfferingsSchema } from "@attendance/infra/database/schemas/class-offering-ref.schema";
import { Injectable } from "@nestjs/common";
import { DrizzleService } from "@shared/infra/database/drizzle.service";
import { eq } from "drizzle-orm";

@Injectable()
export class DrizzleClassOfferingRefRepository
  implements ClassOfferingRefRepository
{
  constructor(private readonly drizzleService: DrizzleService) {}

  async upsert(classOffering: {
    id: string;
    status: ClassOfferingRefStatus;
  }): Promise<void> {
    await this.drizzleService.db
      .insert(classOfferingsSchema)
      .values({ id: classOffering.id, status: classOffering.status })
      .onConflictDoUpdate({
        target: classOfferingsSchema.id,
        set: { status: classOffering.status },
      });
  }

  async cancelById(id: string): Promise<void> {
    await this.drizzleService.db
      .update(classOfferingsSchema)
      .set({ status: "inactive" })
      .where(eq(classOfferingsSchema.id, id));
  }
}
