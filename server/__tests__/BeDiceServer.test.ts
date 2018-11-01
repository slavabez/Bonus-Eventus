import "jest";
import BeDiceServer from "../BeDiceServer";
import * as ioClient from "socket.io-client";

describe("Basic connectivity tests", () => {
  let server: BeDiceServer;
  let clientSocket: SocketIOClient.Socket;

  beforeAll(() => {
    server = new BeDiceServer();
    server.listen();
  });

  afterAll(() => {
    server.close();
  });

  beforeEach(done => {
    clientSocket = ioClient.connect(
      `http://[${server.getAddress()}]:${server.getPort()}`,
      {
        reconnectionDelay: 0,
        forceNew: true,
        transports: ["websocket"]
      }
    );

    clientSocket.on("connect", () => {
      done();
    });
  });

  afterEach(done => {
    if (clientSocket.connected) clientSocket.disconnect();
    done();
  });

  test("Can emit a ping and receive a pong in response", done => {
    clientSocket = ioClient.connect(
      `http://[${server.getAddress()}]:${server.getPort()}`
    );

    clientSocket.on("connect", () => {
      clientSocket.emit("ping");
    });
    clientSocket.on("pong", () => {
      done();
    });
  });
});
