import { RabbitMQService } from "@attendance/messaging/infra/rabbitmq/rabbitmq.service";
import {
  EXCHANGE_TYPE,
  PUBLISHER_EXCHANGES,
  QUEUE_BINDINGS,
} from "@attendance/messaging/application/constants/rabbitmq.constants";
import {
  Injectable,
  Logger,
  type OnApplicationBootstrap,
} from "@nestjs/common";

@Injectable()
export class TopologyBootstrapService implements OnApplicationBootstrap {
  private readonly logger = new Logger(TopologyBootstrapService.name);

  constructor(private readonly rabbitMQService: RabbitMQService) {}

  async onApplicationBootstrap(): Promise<void> {
    const channel = this.rabbitMQService.getChannel();

    await channel.assertExchange(
      PUBLISHER_EXCHANGES.ATTENDANCE_REGISTERED,
      EXCHANGE_TYPE,
      { durable: true },
    );

    for (const { queue, exchange, routingKey } of QUEUE_BINDINGS) {
      await channel.assertExchange(exchange, EXCHANGE_TYPE, { durable: true });
      await channel.assertQueue(queue, { durable: true });
      await channel.bindQueue(queue, exchange, routingKey);
    }

    this.logger.log(
      `Topology bootstrap complete: 1 exchange publicada, ${QUEUE_BINDINGS.length} filas vinculadas`,
    );
  }
}
