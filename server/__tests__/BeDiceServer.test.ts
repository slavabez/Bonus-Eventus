import "jest";
import BeDiceServer from "../BeDiceServer";
import * as ioClient from "socket.io-client";

jest.setTimeout(10000);

describe("Basic connectivity tests", () => {
  let server: BeDiceServer;
  let clientSocket: SocketIOClient.Socket;

  beforeAll(done => {
    server = new BeDiceServer();
    server.listen();
    done();
  });

  afterAll(() => {
    server.stop();
  });

  beforeEach(done => {
    const connString = `http://localhost:${server.getPort()}`;

    clientSocket = ioClient.connect(
      connString,
      {
        transports: ["websocket"]
      }
    );

    clientSocket.on("connect", () => {
      done();
    });
  });

  afterEach(done => {
    if (clientSocket.connected) {
      clientSocket.disconnect();
    }

    done();
  });

  test("Can emit a ping and receive a pong in response", done => {
    clientSocket.on("Pong", (data: any) => {
      expect(data.message).toBe("You bet!");
      done();
    });

    server.io.on("Ping", () => {
      server.io.emit("Pong", { message: "yo" });
    });

    setTimeout(() => {
      clientSocket.emit("Ping", { message: "Are you there?" });
    }, 500);
  });

  test("Can communicate using direct emits from the server", done => {
    clientSocket.on("Test emit", (data: any) => {
      expect(data.test).toBe("Test");
      done();
    });

    server.io.emit("Test emit", { test: "Test" });
  });
});
