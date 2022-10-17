export type Address = {
  addressLine1: string;
  addressLine2: string;
  addressLine3: string;
  addressLine4: string;
  locality: string;
  region: StateCode;
  postalCode: string;
  country: string;
};

export enum REPORT_TYPES {
  HTML = 'Html',
  JSON = 'Json',
}

export enum REQUESTED_PRODUCTS {
  NONE = 'None',
  CREDIT = 'Credit',
  CRIMINAL = 'Criminal',
  ID_REPORT = 'IdReport',
  EVICTION = 'Eviction',
  ALL = 'All',
  INCOME_INSIGHTS = 'IncomeInsights',
  CANADA_CREDIT = 'CanadaCredit',
}

export enum HTTP_METHODS {
  GET = 'get',
  POST = 'post',
  PUT = 'put',
  DELETE = 'delete',
}

export type PhoneType = 'Mobile' | 'Home' | 'Office';

export type StateCode =
  | 'AK'
  | 'AL'
  | 'AR'
  | 'AZ'
  | 'CA'
  | 'CO'
  | 'CT'
  | 'DC'
  | 'DE'
  | 'FL'
  | 'GA'
  | 'HI'
  | 'IA'
  | 'ID'
  | 'IL'
  | 'IN'
  | 'KS'
  | 'KY'
  | 'LA'
  | 'MA'
  | 'MD'
  | 'ME'
  | 'MI'
  | 'MN'
  | 'MO'
  | 'MS'
  | 'MT'
  | 'NC'
  | 'ND'
  | 'NE'
  | 'NH'
  | 'NJ'
  | 'NM'
  | 'NV'
  | 'NY'
  | 'OH'
  | 'OK'
  | 'OR'
  | 'PA'
  | 'RI'
  | 'SC'
  | 'SD'
  | 'TN'
  | 'TX'
  | 'UT'
  | 'VA'
  | 'VT'
  | 'WA'
  | 'WI'
  | 'WV'
  | 'WY';
