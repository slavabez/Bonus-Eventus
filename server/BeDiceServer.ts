import { Server, createServer } from "http";
import * as express from "express";
import * as socketIO from "socket.io";
import { AddressInfo } from "net";
import * as helmet from "helmet";
import * as path from "path";

// Express middleware
import errorMiddleware from "./handlers/errorMiddleware";

// Event handlers
import { handlePing } from "./handlers/connection";
import UserManager, {User} from "./helpers/UserManager";

class BeDiceServer {
  private readonly app: express.Application;
  private readonly server: Server;
  public readonly io: socketIO.Server;

  public address?: string | AddressInfo;
  public um: UserManager;

  constructor() {
    this.app = express();
    this.server = createServer(this.app);
    this.io = socketIO(this.server);
    this.setupExpress();
    this.um = new UserManager();
  }

  listen(port?: number): void {
    this.server.listen(port, () => {
      console.log(`Be-Dice Server listening on port ${this.getPort()}`);
    });
    this.address = this.server.address();
    this.io.on("connection", (socket: socketIO.Socket) => {
      // New user connected, handle
      this.addEventListeners(socket);

      socket.on("disconnect", () => {
        // Disconnected, handle
      });
    });
  }

  setupExpress() {
    // JSON parser and Helmet for basic security settings
    this.app.use(helmet()).use(express.json());
    // Serve static files from React's /build/ folder
    this.app.use(express.static("client/build"));
    this.app.get("*", (req: express.Request, res: express.Response) => {
      // If the route wasn't matched with static, route to index.js
      res.sendFile(path.join(__dirname + "../client/build/index.html"));
    });

    // Add basic error handling
    this.app.use(errorMiddleware);
  }

  public getAddress() {
    if (
      this.address &&
      typeof this.address !== "string" &&
      this.address.address
    )
      return this.address.address;
  }

  public getPort() {
    if (this.address && typeof this.address !== "string" && this.address.port)
      return this.address.port;
  }

  stop(): void {
    this.server.close();
    this.io.close();
  }

  addEventListeners(socket: socketIO.Socket) {
    // Register all events here
    socket.on("server.ping", handlePing(socket));

    // Registration stuff
    socket.on("register.new", this.um.handleNewUserRegistration(socket));
    socket.on("register.restore", this.um.handleRestoreUser(socket));
  }
}

export default BeDiceServer;
