import {
  Injectable,
  Logger,
  type OnModuleDestroy,
  type OnModuleInit,
} from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import amqplib, { type Channel, type ChannelModel } from "amqplib";

@Injectable()
export class RabbitMQService implements OnModuleInit, OnModuleDestroy {
  private readonly logger = new Logger(RabbitMQService.name);
  private connection!: ChannelModel;
  private channel!: Channel;

  constructor(private readonly configService: ConfigService) {}

  async onModuleInit(): Promise<void> {
    const url = this.configService.getOrThrow<string>("RABBITMQ_URL");
    this.connection = await amqplib.connect(url);
    this.channel = await this.connection.createChannel();
    this.logger.log("RabbitMQ connection established");
  }

  async onModuleDestroy(): Promise<void> {
    await this.channel?.close();
    await this.connection?.close();
  }

  getChannel(): Channel {
    return this.channel;
  }

  async createChannel(): Promise<Channel> {
    return this.connection.createChannel();
  }
}
