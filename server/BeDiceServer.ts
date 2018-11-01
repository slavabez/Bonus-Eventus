import { Server, createServer } from "http";
//const express = require("express");
import * as express from "express";
import * as socketIO from "socket.io";

class BeDiceServer {
  private readonly app: express.Application;
  private readonly server: Server;
  private readonly io: SocketIO.Server;

  constructor() {
    this.app = express();
    this.server = createServer(this.app);
    this.io = socketIO(this.server);
  }

  listen(port: number): void {
    this.server.listen(port, () => {
      console.log(`Be-Dice Server listening on port ${port}`);
    });

    this.io.on("connect", (socket: SocketIO.Socket) => {
      // New user connected, handle
      this.handleNewSocketConnected(socket);

      socket.on("disconnect", () => {
        // Disconnected, handle
      });
    });
  }

  handleNewSocketConnected(socket: SocketIO.Socket){
    // Register all events here

  }
}

export default BeDiceServer;
