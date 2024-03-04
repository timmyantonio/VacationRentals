import { IFeature } from "./Feature";

export interface IUnit {
  id: string;
  description: string;
  unitNumber: number;
  floorNumber: number;
  features: IFeature[];
  cost: number;
  isOccupied: boolean;
}
