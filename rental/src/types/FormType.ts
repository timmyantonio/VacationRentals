export interface FormType {
  title: string;
  mobile: string;
  agentCode?: number;
  planDate: string;
  numberOfAdults: number;
  numberOfChildren: number;
  numberOfDays: number;
  amount?: number;
  type: "online" | "onsite";
  unitType: "select" | "standard" | "double" | "extra";
  name: {
    forename: string;
    surname: string;
    middleName?: string;
    suffix?: string;
  };
}
