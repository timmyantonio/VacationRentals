import { IBreakfast } from "./Breakfast";

export interface IAddOn {
  withShuttleService: boolean;
  extraBeds: number;
  breakfast?: IBreakfast;
}
