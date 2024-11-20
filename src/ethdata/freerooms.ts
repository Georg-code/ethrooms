import { getBelegungszeiten } from "./getrooms";
import { Room, Roomid } from "./roomdata";

async function isRoomFree(roomId: Roomid): Promise<boolean> {
  const belegungszeiten = await getBelegungszeiten(roomId);

  const now = new Date();

  for (const belegung of belegungszeiten) {
    const date_from = new Date(belegung.date_from);
    const date_to = new Date(belegung.date_to);

    if (
      now.getTime() >= date_from.getTime() &&
      now.getTime() <= date_to.getTime()
    ) {
      console.log("Room is not free " + roomId.room.floor + roomId.room.nr);
      return false;
    }
  }

  return true;
}

export { isRoomFree };
