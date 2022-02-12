import { Address } from "./address";

export interface Contact {
    id:string,
    firstName: string,
    middleName: string,
    lastName: string,
    address: Address,
    phoneNumber: string,
    emailId: string
}