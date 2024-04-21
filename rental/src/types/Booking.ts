import { IAddOn } from "./AddOn";

export interface IBooking {
  _id?: string;
  guest: string;
  unit?: string;
  type: "online" | "onsite";
  agentCode?: number;
  bookingDate: Date;
  startDate: Date;
  endDate: Date;
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
