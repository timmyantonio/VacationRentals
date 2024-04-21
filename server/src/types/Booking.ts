import { IAddOn } from "./AddOn";
import { IPayment } from "./Payment";

export interface IBooking {
  _id: string;
  guest: string;
  unit: string;
  bookingType: "online" | "onsite";
  bookingDate: Date;
  agentCode?: number;
  startDate: Date;
  endDate: Date;
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
