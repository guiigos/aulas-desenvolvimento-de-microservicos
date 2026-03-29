import { ClassOfferingService } from "@class-offering/application/services/class-offering.service";
import { CLASS_OFFERING_REPOSITORY } from "@class-offering/domain/repositories/class-offering-repository.interface";
import { ClassOfferingsController } from "@class-offering/infra/controllers/class-offerings.controller";
import { DrizzleClassOfferingRepository } from "@class-offering/infra/repositories/drizzle-class-offering.repository";
import { Module } from "@nestjs/common";
import { SharedModule } from "@shared/shared.module";

@Module({
  imports: [SharedModule],
  controllers: [ClassOfferingsController],
  providers: [
    ClassOfferingService,
    DrizzleClassOfferingRepository,
    {
      provide: CLASS_OFFERING_REPOSITORY,
      useExisting: DrizzleClassOfferingRepository,
    },
  ],
})
export class ClassOfferingModule {}
