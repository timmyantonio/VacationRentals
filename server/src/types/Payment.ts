export interface IPayment {
  _id: string;
  bookingId: string;
  guestId: string;
  description: string;
  paymentDate: string;
  paymentType: "cash" | "card";
  amount: number;
}
