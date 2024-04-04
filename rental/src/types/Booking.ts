import { IAddOn } from "./AddOn";

export interface IBooking {
  _id?: string;
  guestId: string;
  unitId?: string;
  type: "online" | "onsite";
  agentCode?: number;
  planDate: Date;
  numberOfDays: number;
  checkInDate?: Date;
  checkOutDate?: Date;
  numberOfAdults: number;
  numberOfChildren: number;
  payments?: string[];
  addOns?: IAddOn[];
  isFullyPaid?: boolean;
  isCheckedIn?: boolean;
  status?: "pending" | "active" | "completed" | "cancelled";
  amount: number;
}
