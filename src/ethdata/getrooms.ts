import { Building, rooms, Roomid, Room } from "./roomdata";

type Belegung = {
  date_from: string;
  date_to: string;
};

async function getBelegungszeiten(roomId: Roomid): Promise<Belegung[]> {
  const url = `https://ethz.ch/bin/ethz/roominfo?path=/rooms/${roomId.building}%20${roomId.room.floor}%20${roomId.room.nr}/allocations&from=2024-11-18&to=2024-11-24`;

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