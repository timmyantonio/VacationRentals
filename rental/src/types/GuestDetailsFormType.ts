export interface GuestDetailFormType {
  title: string;
  mobile: string;
  name: {
    forename: string;
    surname: string;
    middleName?: string;
    suffix?: string;
  };
  email?: string;
  telephone?: string;
}
