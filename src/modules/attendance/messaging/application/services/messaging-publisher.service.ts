import {
  PUBLISHER_EXCHANGES,
  PUBLISHER_ROUTING_KEYS,
} from "@attendance/messaging/application/constants/rabbitmq.constants";
import type { AttendanceRegisteredEvent } from "@attendance/messaging/application/dto/attendance-registered.event";
import { RabbitMQService } from "@attendance/messaging/infra/rabbitmq/rabbitmq.service";
import { Injectable } from "@nestjs/common";

@Injectable()
export class MessagingPublisherService {
  constructor(private readonly rabbitMQService: RabbitMQService) {}

  async publishAttendanceRegistered(
    event: AttendanceRegisteredEvent,
  ): Promise<void> {
    const channel = this.rabbitMQService.getChannel();
    channel.publish(
      PUBLISHER_EXCHANGES.ATTENDANCE_REGISTERED,
      PUBLISHER_ROUTING_KEYS.ATTENDANCE_REGISTERED,
      Buffer.from(JSON.stringify(event)),
      { persistent: true },
    );
  }
}
