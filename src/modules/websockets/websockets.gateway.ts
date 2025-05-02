import { WebSocketGateway, SubscribeMessage, MessageBody, ConnectedSocket } from '@nestjs/websockets';
import { Socket } from 'socket.io';
import { WebsocketsService } from './websockets.service';
import { BoardListenWebsocketDto } from './dto/board-listen-websocket.dto';

@WebSocketGateway()
export class WebsocketsGateway {
  constructor(private readonly websocketsService: WebsocketsService) {}

  @SubscribeMessage('listenBoard')
  listen(@ConnectedSocket() client: Socket, @MessageBody() createWebsocketDto: BoardListenWebsocketDto) {
    return this.websocketsService.listenBoard(client, createWebsocketDto);
  }

  @SubscribeMessage('unlistenBoard')
  unlisten(@ConnectedSocket() client: Socket, @MessageBody() createWebsocketDto: BoardListenWebsocketDto) {
    return this.websocketsService.unlistenBoard(client, createWebsocketDto);
  }
}
