import "jest";
import BeDiceServer from "../BeDiceServer";
import * as ioClient from "socket.io-client";
import RoomManager, { Room } from "../helpers/RoomManager";
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

  test("Both clients connect to the server and can ping", () => {});

  test("broadcastRoomList sends a list of all rooms to all clients", done => {
    expect.assertions(numOfClients * 3);
    // Create some sample rooms
    const rm = new RoomManager();
    rm.createNewRoom("room-1");
    rm.createNewRoom("room-2");
    rm.createNewRoom("room-3");

    const users1 = FakeGenerator.fakeUsers(5);
    const users2 = FakeGenerator.fakeUsers(2);
    const users3 = FakeGenerator.fakeUsers(10);

    users1.forEach(u => rm.addUserToRoom(u, "room-1"));
    users2.forEach(u => rm.addUserToRoom(u, "room-2"));
    users3.forEach(u => rm.addUserToRoom(u, "room-3"));

    let counter = 0;
    // Room 1 should have 5 fake users, room 2 - 2, room 3 - 10
    const receivedEmit = (list: Room[]) => {
      // Every time assert we have the correct numbers
      expect(list[0].numOfUsers).toBe(5);
      expect(list[1].numOfUsers).toBe(2);
      expect(list[2].numOfUsers).toBe(10);

      counter++;
      if (counter >= numOfClients) {
        done();
      }
    };

    // When room list is received - call this function
    clients.forEach(c => {
      c.on("room.list", receivedEmit);
    });

    // Send the broadcast to all users
    rm.broadcastRoomList(server.io);
  });
});
