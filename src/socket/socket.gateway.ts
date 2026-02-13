import { Logger } from '@nestjs/common';
import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({
  cors: {
    origin: true,
    credentials: true,
  },
})
export class SocketGateway
  implements OnGatewayConnection, OnGatewayDisconnect
{
  private readonly logger = new Logger(SocketGateway.name);

  @WebSocketServer()
  server: Server;

  handleConnection(client: Socket): void {
    this.logger.log(`Client connected: ${client.id}`);

    client.emit('connected', {
      clientId: client.id,
      message: 'Socket connection established',
    });
  }

  handleDisconnect(client: Socket): void {
    this.logger.log(`Client disconnected: ${client.id}`);
  }

  @SubscribeMessage('ping')
  handlePing(
    @ConnectedSocket() client: Socket,
    @MessageBody() payload: unknown,
  ): { event: string; data: unknown } {
    return {
      event: 'pong',
      data: {
        clientId: client.id,
        payload: payload ?? null,
        timestamp: new Date().toISOString(),
      },
    };
  }

  @SubscribeMessage('broadcast')
  handleBroadcast(
    @MessageBody() payload: unknown,
  ): { event: string; data: unknown } {
    this.server.emit('broadcast', payload);

    return {
      event: 'broadcast_ack',
      data: {
        sent: true,
      },
    };
  }
}
