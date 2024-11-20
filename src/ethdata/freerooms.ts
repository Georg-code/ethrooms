import { getBelegungszeiten } from "./getrooms";
import { Room, Roomid } from "./roomdata";

async function isRoomFree(roomid: Roomid): Promise<boolean> {
  const rooms = await getBelegungszeiten(roomid);
  rooms.forEach((room) => {
    // convert date strings to Date objects
    const date_from = new Date(room.date_from);
    const date_to = new Date(room.date_to);
    const now = new Date();
    if (now >= date_from && now <= date_to) {
      return false;
    }
  });

  return true;
}

export { isRoomFree };