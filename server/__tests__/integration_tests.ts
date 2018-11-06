import "jest";
import BeDiceServer from "../BeDiceServer";
import * as ioClient from "socket.io-client";
import RoomManager from "../helpers/RoomManager";
import FakeGenerator from "../helpers/FakeGenerator";

describe("Server-client integration tests", () => {
  let server: BeDiceServer;
  let clients: SocketIOClient.Socket[] = [];
  const numOfClients = 5;

  //#region Preparing and tearing down socketIO server/clients
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

    let counter = 0;

    const connected = () => {
      counter++;
      if (counter >= numOfClients) done();
    };

    for (let i = 0; i < numOfClients; i++) {
      const socket = ioClient.connect(
        connString,
        { transports: ["websocket"] }
      );
      socket.on("connect", connected);
      clients.push(socket);
    }
  });

  afterEach(done => {
    clients.forEach(c => {
      if (c.connected) c.disconnect();
    });
    done();
  });
  //#endregion

  test("Both clients connect to the server and can ping", () => {

  });

  test("broadcastRoomList sends a list of all rooms to all clients", () => {
    // Create some sample rooms
    const rm = new RoomManager();
    rm.createNewRoom("room-1");
    rm.createNewRoom("room-2");
    rm.createNewRoom("room-3");

    const users = FakeGenerator.fakeUsers(10);
  });
});
