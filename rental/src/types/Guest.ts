import { IContact } from "./Contact";
import { IName } from "./Name";

export interface IGuest {
  _id?: string;
  joinedDate: Date;
  name: IName;
  contact: IContact;
}
