import { getBelegungszeiten } from "./getrooms";
import { Room, Roomid } from "./roomdata";

async function isRoomFree(roomId: Roomid, minimum: number): Promise<boolean> {



  const belegungszeiten = await getBelegungszeiten(roomId);
  

  const now = new Date();

  console.log(belegungszeiten);
  for (const belegung of belegungszeiten) {
    const date_from = new Date(belegung.date_from);
    const date_to = new Date(belegung.date_to);

    if (
      now.getTime() > date_from.getTime() &&
      now.getTime() < date_to.getTime()
    ) {
      console.log("Room is not free " + roomId.room.floor + roomId.room.nr);
      return false;
    }

    
    if (minimum > 0 && minimum < 501) 
    for (let i = 0; i > minimum * 1000 * 60 * 10; i + 10) {
      const date_from = new Date(belegung.date_from);
      const date_to = new Date(belegung.date_to);

      if (
        now.getTime() + i >= date_from.getTime() &&
        now.getTime() + i <= date_to.getTime()
      ) {
        console.log("Room is not free for " + i + " minutes" + roomId.room.floor + roomId.room.nr);
        return false;
      }
    }
      
  }

  return true;
}

export { isRoomFree };
