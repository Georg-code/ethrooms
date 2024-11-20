import { Building, rooms, Roomid, Room } from "./roomdata";

type Belegung = {
  date_from: string;
  date_to: string;
};

async function getBelegungszeiten(roomId: Roomid): Promise<Belegung[]> {
  // current date in this format 2024-11-18
  const now = new Date();
  const date = now.toISOString().split("T")[0];
  console.log(date);
  const url = `https://ethz.ch/bin/ethz/roominfo?path=/rooms/${roomId.building}%20${roomId.room.floor}%20${roomId.room.nr}/allocations&from=${date}&to=${date}`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data: any[] = await response.json();

    // Extract all time slots with a "belegung"
    const belegungszeiten = data
      .filter((entry) => entry.date_from && entry.date_to) // Ensure the entry has dates
      .map((entry) => ({
        date_from: entry.date_from,
        date_to: entry.date_to,
      }));
    console.log(belegungszeiten);
    return belegungszeiten;
  } catch (error) {
    console.error("Error fetching or processing data:", error);
    return [];
  }
}

export { getBelegungszeiten };
