import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { BoardListenWebsocketDto } from './dto/board-listen-websocket.dto';
import { TokenUtils } from 'src/core/utils/token/token.utils';

@Injectable()
export class WebsocketsService {

  /**
   * Map of boardId to array of userIds that are listening to that board.
   */
  listeningBoards: Map<string, string[]> = new Map<string, string[]>();

  listenBoard(listenBoard: BoardListenWebsocketDto) {
    const { token, boardId } = listenBoard;
    const user = TokenUtils.verifyToken(token);
    if (!user) {
      throw new HttpException('Invalid token', HttpStatus.UNAUTHORIZED);
    }

    if (!this.listeningBoards.has(boardId)) {
      this.listeningBoards.set(boardId, [user.id]);
      return;
    }

    if (this.listeningBoards.get(boardId).includes(user.id)) {
      throw new HttpException('Already listening to this board', HttpStatus.PRECONDITION_FAILED);
    }

    this.listeningBoards.get(boardId).push(user.id);
  }

  unlistenBoard(listenBoard: BoardListenWebsocketDto) {
    const { token, boardId } = listenBoard;
    const user = TokenUtils.verifyToken(token);
    if (!user) {
      throw new HttpException('Invalid token', HttpStatus.UNAUTHORIZED);
    }

    if (!this.listeningBoards.has(boardId)) {
      throw new HttpException('Not listening to this board', HttpStatus.PRECONDITION_FAILED);
    }

    const userIds = this.listeningBoards.get(boardId).filter((userId) => userId !== user.id);

    if (userIds.length === 0) {
      this.listeningBoards.delete(boardId);
    }
  }

  notifyBoard(boardId: string, data: any) {
    this.listeningBoards.get(boardId).forEach((userId) => {});
  }
}
