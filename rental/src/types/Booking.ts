import { IAddOn } from "./AddOn";

export interface IBooking {
  _id?: string;
  guestId: string;
  unitId: string;
  type: "online" | "onsite";
  agentCode?: number;
  planDate: Date;
  numberOfDays: Number;
  checkInDate?: Date;
  checkOutDate?: Date;
  numberOfAdults: number;
  numberOfChildren: number;
  payments: string[];
  addOns: IAddOn[];
  isFullyPaid: boolean;
  isCheckedId: boolean;
  status: "pending" | "active" | "completed" | "cancelled";
  amount: number;
}
