export interface Room {
  floor: string;
  nr: string;
}

export interface Roomid {
  building: Building;
  room: Room;
}

export enum Building {
  GLC = "GLC",
  HIL = "HIL",
  LEE = "LEE",
  ML = "ML",
  NO = "NO",
}

// make a map of building to room

export const rooms: Record<Building, Room[]> = {
  [Building.GLC]: [{ floor: "E", nr: "29.1"}],
  [Building.HIL]: [],
  [Building.LEE]: [],
  [Building.ML]: [],
  [Building.NO]: [],
};
