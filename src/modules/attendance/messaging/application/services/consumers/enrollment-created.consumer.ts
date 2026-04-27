import {
  CONSUMER_QUEUES,
  CONSUMER_ROUTING_KEYS,
} from "@attendance/messaging/application/constants/rabbitmq.constants";
import {
  ENROLLMENT_REF_REPOSITORY,
  type EnrollmentRefRepository,
} from "@attendance/domain/repositories/enrollment-ref-repository.interface";
import { RabbitMQService } from "@attendance/messaging/infra/rabbitmq/rabbitmq.service";
import {
  Inject,
  Injectable,
  Logger,
  type OnApplicationBootstrap,
  type OnModuleDestroy,
} from "@nestjs/common";
import type { Channel, ConsumeMessage } from "amqplib";

const QUEUE = CONSUMER_QUEUES.ENROLLMENT_CREATED;

@Injectable()
export class EnrollmentCreatedConsumer
  implements OnApplicationBootstrap, OnModuleDestroy
{
  private readonly logger = new Logger(EnrollmentCreatedConsumer.name);
  private channel!: Channel;

  constructor(
    private readonly rabbitMQService: RabbitMQService,
    @Inject(ENROLLMENT_REF_REPOSITORY)
    private readonly enrollmentRefRepository: EnrollmentRefRepository,
  ) {}

  async onApplicationBootstrap(): Promise<void> {
    this.channel = await this.rabbitMQService.createChannel();
    await this.channel.assertQueue(QUEUE, { durable: true });
    await this.channel.prefetch(1);
    await this.channel.consume(QUEUE, (msg) => this.handle(msg), {
      noAck: false,
    });
    this.logger.log(
      `Consumer registrado na fila "${QUEUE}" (routing key "${CONSUMER_ROUTING_KEYS.ENROLLMENT_CREATED}")`,
    );
  }

  async onModuleDestroy(): Promise<void> {
    await this.channel?.close();
  }

  private async handle(msg: ConsumeMessage | null): Promise<void> {
    if (!msg) return;

    let payload: unknown;
    try {
      payload = JSON.parse(msg.content.toString());
    } catch (err) {
      this.logger.error(`Falha ao parsear JSON em "${QUEUE}"`, err as Error);
      this.channel.nack(msg, false, false);
      return;
    }

    if (!isEnrollmentCreatedPayload(payload)) {
      this.logger.error(
        `Payload inválido em "${QUEUE}": ${msg.content.toString()}`,
      );
      this.channel.nack(msg, false, false);
      return;
    }

    try {
      await this.enrollmentRefRepository.upsert({
        id: payload.id,
        studentId: payload.studentId,
        classOfferingId: payload.classOfferingId,
        status: payload.status,
      });
      this.channel.ack(msg);
    } catch (err) {
      this.logger.error(
        `Falha ao persistir enrollment em "${QUEUE}" (id=${payload.id})`,
        err as Error,
      );
      this.channel.nack(msg, false, false);
    }
  }
}

function isEnrollmentCreatedPayload(value: unknown): value is {
  id: string;
  studentId: string;
  classOfferingId: string;
  status: "active" | "canceled";
} {
  if (!value || typeof value !== "object") return false;
  const v = value as Record<string, unknown>;
  return (
    typeof v.id === "string" &&
    typeof v.studentId === "string" &&
    typeof v.classOfferingId === "string" &&
    (v.status === "active" || v.status === "canceled")
  );
}
