import { WebSocketGateway, SubscribeMessage, MessageBody } from '@nestjs/websockets';
import { WebsocketsService } from './websockets.service';
import { BoardListenWebsocketDto } from './dto/board-listen-websocket.dto';

@WebSocketGateway()
export class WebsocketsGateway {
  constructor(private readonly websocketsService: WebsocketsService) {}

  @SubscribeMessage('listenBoard')
  listen(@MessageBody() createWebsocketDto: BoardListenWebsocketDto) {
    return this.websocketsService.listenBoard(createWebsocketDto);
  }
}
