import { HttpException, HttpStatus, Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { BoardListenWebsocketDto } from './dto/board-listen-websocket.dto';
import { TokenUtils } from 'src/core/utils/token/token.utils';
import { Socket } from 'socket.io';
import { BoardsService } from '../boards/boards.service';

@Injectable()
export class WebsocketsService implements OnModuleInit, OnModuleDestroy {
  readonly subscriptionKey = 'ws';

  onModuleInit() {
    BoardsService.onBoardUpdate?.subscribe(this.subscriptionKey, this.notifyBoard.bind(this));
  }

  onModuleDestroy() {
    BoardsService.onBoardUpdate?.unsubscribe(this.subscriptionKey);
  }

  /**
   * Map of boardId to array of userIds that are listening to that board.
   */
  private listeningBoards: Map<string, Socket[]> = new Map<string, Socket[]>();

  listenBoard(socket: Socket, listenBoard: BoardListenWebsocketDto) {
    const { token, boardId } = listenBoard;
    const user = TokenUtils.verifyToken(token);
    if (!user) {
      throw new HttpException('Invalid token', HttpStatus.UNAUTHORIZED);
    }

    if (!this.listeningBoards.has(boardId)) {
      this.listeningBoards.set(boardId, [socket]);
      return;
    }

    if (this.listeningBoards.get(boardId).includes(socket)) {
      throw new HttpException('Already listening to this board', HttpStatus.PRECONDITION_FAILED);
    }

    this.listeningBoards.get(boardId).push(socket);
  }

  unlistenBoard(socket: Socket, listenBoard: BoardListenWebsocketDto) {
    const { token, boardId } = listenBoard;
    const user = TokenUtils.verifyToken(token);
    if (!user) {
      throw new HttpException('Invalid token', HttpStatus.UNAUTHORIZED);
    }

    if (!this.listeningBoards.has(boardId)) {
      throw new HttpException('Not listening to this board', HttpStatus.PRECONDITION_FAILED);
    }

    const userIds = this.listeningBoards.get(boardId).filter((socketInfo) => socketInfo !== socket);

    if (userIds.length === 0) {
      this.listeningBoards.delete(boardId);
    }
  }

  notifyBoard(boardIds: string[]) {
    boardIds.forEach((boardId) => {
      const sockets = this.listeningBoards.get(boardId);
      if (!sockets) return;
      sockets.forEach((socket) => {
        socket.emit('boardUpdate', {
          boardId,
        });
      });
    });
  }
}
