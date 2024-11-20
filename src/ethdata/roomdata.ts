import { getallrooms } from "./getallrooms";

export enum RoomType {
  "Seminare / Kurse",
  "Sitzungszimmer",
  "Computer",
  "Ausstellungsfläche",
  "Hörsaal",
}

export interface Room {
  floor: string;
  nr: string;
  type?: RoomType;
}

export interface Roomid {
  building: Building;
  room: Room;
}

export enum Building {
  CAB = "CAB",
  CHN = "CHN",
  CLA = "CLA",
  ETA = "ETA",
  ETF = "ETF",
  ETL = "ETL",
  ETZ = "ETZ",
  GLC = "GLC",
  HAA = "HAA",
  HG = "HG",
  IFW = "IFW",
  LEE = "LEE",
  LEH = "LEH",
  LFO = "LFO",
  LFV = "LFV",
  LFW = "LFW",
  NO = "NO",
  RZ = "RZ",
  SEC = "SEC",
  SEW = "SEW",
  TUR = "TUR",
  ZUE = "ZUE",
  ML = "ML",
}

// make a map of building to room

export const rooms: Record<Building, Room[]> = {
  [Building.GLC]: [],
  [Building.LEE]: [],
  [Building.ML]: [],
  [Building.NO]: [],
  [Building.CAB]: [],
  [Building.HG]: [],
  [Building.CHN]: [],
  [Building.CLA]: [],
  [Building.ETA]: [],
  [Building.ETF]: [],
  [Building.ETL]: [],
  [Building.ETZ]: [],
  [Building.HAA]: [],
  [Building.IFW]: [],
  [Building.LEH]: [],
  [Building.LFO]: [],
  [Building.LFV]: [],
  [Building.LFW]: [],
  [Building.RZ]: [],
  [Building.SEC]: [],
  [Building.SEW]: [],
  [Building.TUR]: [],
  [Building.ZUE]: [],
};

// fill in the rooms
