import "jest";
import RoomManager from "./RoomManager";


describe("RoomManager", () => {
  test("Creating new room works", () => {
    const rm = new RoomManager();
    const room = rm.createNewRoom("Test Room");
    expect(room!.history).toHaveLength(0);
    expect(room!.name).toBe("Test Room");
    expect(room!.users.size).toBe(0);
    expect(rm.allRooms.size).toBe(1);
  });

  test("addUserToRoom works", () => {
    const rm = new RoomManager();
    const roomName = "Sample";
    rm.createNewRoom(roomName);
  });
});
