import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
} from "@nestjs/common";
import { ApiOperation, ApiTags } from "@nestjs/swagger";
import { MessagingService } from "@messaging/application/services/messaging.service";
import { PublishMessageDto } from "@messaging/application/dto/publish-message.dto";
import { ConsumedMessageDto } from "@messaging/application/dto/consumed-message.dto";
import { Public } from "@shared/infra/decorators/public.decorator";

const EXCHANGE_NAME = "school-control-example";
const EXCHANGE_TYPE = "direct";

const QUEUE_NAME = "school-control-example.queue";
const ROUTING_KEY = "school-control-example.key";

@ApiTags("messaging")
@Controller("messaging")
export class MessagingController {
  constructor(private readonly messagingService: MessagingService) {}

  @Post("exchange")
  @Public()
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: "Criar/assegurar a exchange" })
  async createExchange(): Promise<void> {
    return this.messagingService.createExchange(EXCHANGE_NAME, EXCHANGE_TYPE);
  }

  @Post("queue")
  @Public()
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: "Criar/assegurar a fila e vinculá-la à exchange" })
  async createQueue(): Promise<void> {
    return this.messagingService.createQueue(
      QUEUE_NAME,
      EXCHANGE_NAME,
      ROUTING_KEY,
    );
  }

  @Post("publish")
  @Public()
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: "Publicar mensagem na exchange" })
  async publish(@Body() body: PublishMessageDto): Promise<void> {
    return this.messagingService.publish(body, EXCHANGE_NAME, ROUTING_KEY);
  }

  @Get("consume")
  @Public()
  @ApiOperation({ summary: "Ler próxima mensagem da fila" })
  async consume(): Promise<ConsumedMessageDto> {
    return this.messagingService.consume(QUEUE_NAME);
  }
}
