export type Property = {
  propertyId: number;
  propertyName: string;
  rent: number;
  deposit: number;
  isActive: boolean;
  addressLine1: string;
  addressLine2: string;
  addressLine3: string;
  addressLine4: string;
  locality: string;
  region: string;
  postalCode: string;
  country: string;
  bankruptcyCheck: boolean;
  bankruptcyTimeFrame: number;
  incomeToRentRatio: number;
};
