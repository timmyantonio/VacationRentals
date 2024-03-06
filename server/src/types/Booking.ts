import { IAddOn } from "./AddOn";
import { IPayment } from "./Payment";

export interface IBooking {
  _id: string;
  guestId: string;
  unitId: string;
  type: "online" | "onsite";
  agentCode?: number;
  checkInDate: Date;
  checkOutDate?: Date;
  numberOfAdults: number;
  numberOfChildren: number;
  payments: string[];
  addOns: IAddOn[];
  isFullyPaid: boolean;
  isCancelled: boolean;
  amount: number;
}
