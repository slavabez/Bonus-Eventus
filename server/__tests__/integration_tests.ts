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

describe("Simple use flow tests with single client", () => {
  let server: BeDiceServer;
  let client: SocketIOClient.Socket;

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

    client = ioClient.connect(
      connString,
      { transports: ["websocket"] }
    );

    client.on("connect", () => {
      done();
    });
  });
  afterEach(done => {
    if (client.connected) {
      client.disconnect();
    }
    done();
  });

  test("register user -> session -> restore user works", done => {
    expect.assertions(5);
    const userProps = {
      avatar: "some_image.jpeg",
      name: "Josh Peterson",
      color: "#ff34ac"
    };

    client.on("register.new.success", (data: any) => {
      // Expect the session object to be a string, less than 4000 bytes
      expect(typeof data.session).toBe("string");
      expect(Buffer.byteLength(data.session, "utf8")).toBeLessThan(4000);
      client.emit("register.restore", data.session);
    });

    client.on("register.new.failure", () => {
      done.fail(
        "Expected register.new.success, got register.new.failure instead"
      );
    });

    client.on("register.restore.success", (user: any) => {
      expect(user.name).toBe(userProps.name);
      expect(user.avatar).toBe(userProps.avatar);
      expect(user.color).toBe(userProps.color);
      done();
    });

    client.on("register.restore.failure", () => {
      done.fail(new Error("Expected register.restore.success but received registration.restore.failure"));
    });

    // Set everything in motion
    client.emit("register.new", userProps);
  });

  test.skip("register user -> create & enter room -> leave room works", () => {
    const userProps = { name: "Tester", avatar: "yikes.png", color: "red" };
    const roomName = "A New Room";

    client.on("register.new.success", () => {
      // Success, create and join a room
      client.emit("room.create", roomName);
    });

    client.emit("register.new", userProps);
  });
  test.skip("register user -> create & enter room -> roll a few dice -> leave room works", () => {});
  test.skip("register user -> create & enter room -> leave room -> create & join another room works", () => {});

});
