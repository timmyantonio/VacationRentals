import { IFeature } from "./Feature";

export interface IUnit {
  id: string;
  description: "standard" | "extra" | "double";
  unitNumber: number;
  floorNumber: number;
  features: IFeature[];
  cost: number;
  isOccupied: boolean;
}
