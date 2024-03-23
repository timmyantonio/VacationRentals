import { IFeature } from "./Feature";

export interface IUnit {
  _id?: string;
  description: "standard" | "extra" | "double";
  unitNumber: number;
  floorNumber: number;
  feature: IFeature;
  status: "booked" | "occupied" | "available";
  dateRegistered: Date;
  locationCode: string;
}
