import { Address, PhoneType } from './global.d';

export type Landlord = {
  landlordId?: number;
  emailAddress: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  phoneType: PhoneType;
  businessName: string;
  businessAddress: Address;
  acceptedTermsAndConditions: boolean;
};
