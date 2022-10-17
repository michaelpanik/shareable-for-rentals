import { Address, PhoneType } from "./global.d";

type Person = {
  personId: number;
  emailAddress: string;
  firstName: string;
  middleName: string;
  lastName: string;
  phoneNumber: string;
  phoneType: PhoneType;
  socialSecurityNumber: string;
  dateOfBirth: string;
  homeAddress: Address;
  acceptedTermsAndConditions: true;
};

type Renter = {
  person: Person;
  income: number;
  incomeFrequency: string;
  otherIncome: number;
  otherIncomeFrequency: string;
  assets: number;
  employmentStatus: string;
  multiShareExpirationDate: string;
};

export type GetRenterOutput = Renter;

export type CreateRenterInput = Renter;

export type UpdateRenterInput = Renter;

export type CreateReportInput = {
  person: Person;
};

export type CreateReportOutput = {
  name: string;
  message: string;
  errors: Array<{
    field: string;
    message: string;
  }>;
};
