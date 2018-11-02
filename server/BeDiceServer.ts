import { Server, createServer } from "http";
//const express = require("express");
import * as express from "express";
import * as socketIO from "socket.io";
import { AddressInfo } from "net";

// Event handlers
import { handlePing } from "./handlers/connection";

class BeDiceServer {
  private readonly app: express.Application;
  private readonly server: Server;
  public readonly io: SocketIO.Server;

  public address?: string | AddressInfo;

  constructor() {
    this.app = express();
    this.server = createServer(this.app);
    this.io = socketIO(this.server);
  }

  listen(port?: number): void {
    this.server.listen(port, () => {
      console.log(`Be-Dice Server listening on port ${this.getPort()}`);
    });
    this.address = this.server.address();
    this.io.on("connection", (socket: SocketIO.Socket) => {
      // New user connected, handle
      this.addEventListeners(socket);

      socket.on("disconnect", () => {
        // Disconnected, handle
      });
    });
  }

  getAddress() {
    if (
      this.address &&
      typeof this.address !== "string" &&
      this.address.address
    )
      return this.address.address;
  }

  getPort() {
    if (this.address && typeof this.address !== "string" && this.address.port)
      return this.address.port;
  }

  stop(): void {
    this.server.close();
    this.io.close();
  }

  addEventListeners(socket: SocketIO.Socket) {
    // Register all events here
    socket.on("server.ping", handlePing(socket));
  }

}

export default BeDiceServer;
