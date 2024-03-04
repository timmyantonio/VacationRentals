import { IBreakfast } from "./Breakfast";

export interface IAddOn {
  id: string;
  withShuttleService: boolean;
  extraBeds: number;
  breakfast?: IBreakfast;
}
