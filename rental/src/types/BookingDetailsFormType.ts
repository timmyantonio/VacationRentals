export interface BookingDetailsFormType {
  agentCode?: number;
  startDate: string;
  endDate: string;
  numberOfAdults: number;
  numberOfChildren: number;
  amount?: number;
  type: "online" | "onsite";
  unitType: "select" | "standard" | "double" | "extra";
}
