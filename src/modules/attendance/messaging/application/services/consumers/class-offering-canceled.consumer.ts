import {
  CONSUMER_QUEUES,
  CONSUMER_ROUTING_KEYS,
} from "@attendance/messaging/application/constants/rabbitmq.constants";
import {
  CLASS_OFFERING_REF_REPOSITORY,
  type ClassOfferingRefRepository,
} from "@attendance/domain/repositories/class-offering-ref-repository.interface";
import { RabbitMQService } from "@attendance/messaging/infra/rabbitmq/rabbitmq.service";
import {
  Inject,
  Injectable,
  Logger,
  type OnApplicationBootstrap,
  type OnModuleDestroy,
} from "@nestjs/common";
import type { Channel, ConsumeMessage } from "amqplib";

const QUEUE = CONSUMER_QUEUES.CLASS_OFFERING_CANCELED;

@Injectable()
export class ClassOfferingCanceledConsumer
  implements OnApplicationBootstrap, OnModuleDestroy
{
  private readonly logger = new Logger(ClassOfferingCanceledConsumer.name);
  private channel!: Channel;

  constructor(
    private readonly rabbitMQService: RabbitMQService,
    @Inject(CLASS_OFFERING_REF_REPOSITORY)
    private readonly classOfferingRefRepository: ClassOfferingRefRepository,
  ) {}

  async onApplicationBootstrap(): Promise<void> {
    this.channel = await this.rabbitMQService.createChannel();
    await this.channel.assertQueue(QUEUE, { durable: true });
    await this.channel.prefetch(1);
    await this.channel.consume(QUEUE, (msg) => this.handle(msg), {
      noAck: false,
    });
    this.logger.log(
      `Consumer registrado na fila "${QUEUE}" (routing key "${CONSUMER_ROUTING_KEYS.CLASS_OFFERING_CANCELED}")`,
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

    if (!isClassOfferingCanceledPayload(payload)) {
      this.logger.error(
        `Payload inválido em "${QUEUE}": ${msg.content.toString()}`,
      );
      this.channel.nack(msg, false, false);
      return;
    }

    try {
      await this.classOfferingRefRepository.cancelById(payload.id);
      this.channel.ack(msg);
    } catch (err) {
      this.logger.error(
        `Falha ao cancelar class-offering em "${QUEUE}" (id=${payload.id})`,
        err as Error,
      );
      this.channel.nack(msg, false, false);
    }
  }
}

function isClassOfferingCanceledPayload(
  value: unknown,
): value is { id: string } {
  if (!value || typeof value !== "object") return false;
  const v = value as Record<string, unknown>;
  return typeof v.id === "string";
}
