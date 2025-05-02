import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { BoardListenWebsocketDto } from './dto/board-listen-websocket.dto';
import { TokenUtils } from 'src/core/utils/token/token.utils';
import { Socket } from 'socket.io';

@Injectable()
export class WebsocketsService {

  /**
   * Map of boardId to array of userIds that are listening to that board.
   */
  listeningBoards: Map<string, Socket[]> = new Map<string, Socket[]>();

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

  notifyBoard<T>(params: {
    boardId: string;
    event: string;
    data?: T;
  }) {
    this.listeningBoards.get(params.boardId).forEach((socket) => socket.emit(params.event, params.data));
  }
}
