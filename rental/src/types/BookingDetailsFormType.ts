export interface BookingDetailsFormType {
  agentCode?: number;
  planDate: string;
  numberOfAdults: number;
  numberOfChildren: number;
  numberOfDays: number;
  amount?: number;
  type: "online" | "onsite";
  unitType: "select" | "standard" | "double" | "extra";
}
