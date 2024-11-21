import { Building, Room, rooms, RoomType } from "./roomdata";

export type Root = Root2[];

export interface Root2 {
  building: string;
  floor: string;
  room: string;
  area: string;
  region: string;
  location: Location;
  typecode: string;
  type: string;
  seats?: string;
  additionalSeats?: number;
  seating?: string;
  floorArea: number;
  usableHeight: number;
  floorShape: string;
  wallchart?: string;
  wallchartSize: number;
  rectorateResponsability?: string;
  monitors: number;
  videoConference?: string;
  hdmiConnections: number;
  vgaConnections: number;
  record?: string;
  beamer?: string;
  lecturersDesk?: string;
  overheadProjector: number;
  speakers?: string;
  microphonesWireless: number;
  microphones: number;
  projectionArea: number;
  projectionScreen?: string;
  visualizer?: string;
  hearingImpairedSupport?: string;
  hearingImpairedSupportNote?: string;
  other?: string;
  orgunit: Orgunit[];
  wallchartSurface?: string;
  roomInformationText?: string;
  workplaces?: number;
  dataTransfer?: string;
  specialEquipment?: string;
}

export interface Location {
  areaDesc: string;
  regionDesc: string;
  region: string;
  area: string;
}

export interface Orgunit {
  region: string;
  areal: string;
  name: string;
  orgunit: string;
  gebaeude: string;
  geschoss: string;
  raumnr: string;
  responsibleUrlText?: string;
  responsibleUrl?: string;
  responsiblePerson?: string;
}

const url = `https://ethz.ch/bin/ethz/roominfo?path=/rooms/filter&location=Z+Z&lang=de`;

async function getallrooms() {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data: Root = await response.json();

    data.forEach((room) => {
      const building = Building[room.building as keyof typeof Building];
      if (!rooms[building]) {
        rooms[building] = [];
      }
      rooms[building].push({
        floor: room.floor,
        nr: room.room,
        type: room.type,
      });
    });

    // Extract all time slots with a "belegung"
  } catch (error) {
    console.error("Error fetching or processing data:", error);
  }

  //console.log(rooms);
  return rooms;
}

export { getallrooms };
