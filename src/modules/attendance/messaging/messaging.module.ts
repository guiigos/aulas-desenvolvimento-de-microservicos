import { CLASS_OFFERING_REF_REPOSITORY } from "@attendance/domain/repositories/class-offering-ref-repository.interface";
import { ENROLLMENT_REF_REPOSITORY } from "@attendance/domain/repositories/enrollment-ref-repository.interface";
import { STUDENT_REF_REPOSITORY } from "@attendance/domain/repositories/student-ref-repository.interface";
import { DrizzleClassOfferingRefRepository } from "@attendance/infra/repositories/drizzle-class-offering-ref.repository";
import { DrizzleEnrollmentRefRepository } from "@attendance/infra/repositories/drizzle-enrollment-ref.repository";
import { DrizzleStudentRefRepository } from "@attendance/infra/repositories/drizzle-student-ref.repository";
import { ClassOfferingCanceledConsumer } from "@attendance/messaging/application/services/consumers/class-offering-canceled.consumer";
import { ClassOfferingCreatedConsumer } from "@attendance/messaging/application/services/consumers/class-offering-created.consumer";
import { ClassOfferingUpdatedConsumer } from "@attendance/messaging/application/services/consumers/class-offering-updated.consumer";
import { EnrollmentCanceledConsumer } from "@attendance/messaging/application/services/consumers/enrollment-canceled.consumer";
import { EnrollmentCreatedConsumer } from "@attendance/messaging/application/services/consumers/enrollment-created.consumer";
import { StudentCreatedConsumer } from "@attendance/messaging/application/services/consumers/student-created.consumer";
import { StudentDeletedConsumer } from "@attendance/messaging/application/services/consumers/student-deleted.consumer";
import { StudentUpdatedConsumer } from "@attendance/messaging/application/services/consumers/student-updated.consumer";
import { MessagingPublisherService } from "@attendance/messaging/application/services/messaging-publisher.service";
import { RabbitMQService } from "@attendance/messaging/infra/rabbitmq/rabbitmq.service";
import { TopologyBootstrapService } from "@attendance/messaging/infra/rabbitmq/topology-bootstrap.service";
import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { SharedModule } from "@shared/shared.module";

@Module({
  imports: [ConfigModule, SharedModule],
  providers: [
    RabbitMQService,
    TopologyBootstrapService,
    MessagingPublisherService,
    DrizzleStudentRefRepository,
    {
      provide: STUDENT_REF_REPOSITORY,
      useExisting: DrizzleStudentRefRepository,
    },
    DrizzleClassOfferingRefRepository,
    {
      provide: CLASS_OFFERING_REF_REPOSITORY,
      useExisting: DrizzleClassOfferingRefRepository,
    },
    DrizzleEnrollmentRefRepository,
    {
      provide: ENROLLMENT_REF_REPOSITORY,
      useExisting: DrizzleEnrollmentRefRepository,
    },
    StudentCreatedConsumer,
    StudentUpdatedConsumer,
    StudentDeletedConsumer,
    ClassOfferingCreatedConsumer,
    ClassOfferingUpdatedConsumer,
    ClassOfferingCanceledConsumer,
    EnrollmentCreatedConsumer,
    EnrollmentCanceledConsumer,
  ],
  exports: [MessagingPublisherService],
})
export class MessagingModule {}
