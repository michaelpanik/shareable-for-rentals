import {
  CreateRenterInput,
  CreateReportInput,
  CreateReportOutput,
  GetRenterOutput,
  UpdateRenterInput,
} from './Renters.d';
import BaseAPI from './BaseAPI';
import { REPORT_TYPES, REQUESTED_PRODUCTS } from './global.d';
export enum HTTP_METHODS {
  GET = 'get',
  POST = 'post',
  PUT = 'put',
  DELETE = 'delete',
}

export class Renters {
  private endpoint: string = 'Renters';
  private BaseAPI: BaseAPI;

  constructor(baseApi: BaseAPI) {
    this.BaseAPI = baseApi;
  }

  public async getOne(renterId: number): Promise<GetRenterOutput> {
    const renter = await this.BaseAPI.callApi(`${this.endpoint}/${renterId}`, HTTP_METHODS.GET);
    if (renter) {
      return renter;
    } else {
      throw Error(`Unable to get renter with ID ${renterId}.`);
    }
  }

  public async getReport(
    screeningRequestRenterId: number,
    requestedProduct?: REQUESTED_PRODUCTS,
    reportType?: REPORT_TYPES,
  ) {
    const params = new URLSearchParams();

    if (requestedProduct) {
      params.append('requestedProduct', requestedProduct);
    }

    if (reportType) {
      params.append('reportType', reportType);
    }

    const renter = await this.BaseAPI.callApi(
      `${this.endpoint}/ScreeningRequestRenters/${screeningRequestRenterId}/Reports${params.toString()}`,
      HTTP_METHODS.GET,
    );
    if (renter) {
      return renter;
    } else {
      throw Error(`Unable to get report with ID ${screeningRequestRenterId}.`);
    }
  }

  public async createReport(
    screeningRequestRenterId: number,
    newReport: CreateReportInput,
  ): Promise<CreateReportOutput> {
    const report = await this.BaseAPI.callApi(
      `${this.endpoint}/ScreeningRequestRenters/${screeningRequestRenterId}/Reports`,
      HTTP_METHODS.POST,
      newReport,
    );

    if (report) {
      return report;
    } else {
      throw Error(`Unable to get report with ID ${screeningRequestRenterId}.`);
    }
  }

  public async getAvailableReportNames(screeningRequestRenterId: number): Promise<string[]> {
    const reportNames = await this.BaseAPI.callApi(
      `${this.endpoint}/ScreeningRequestRenters/${screeningRequestRenterId}/Reports/Names`,
      HTTP_METHODS.GET,
    );

    if (reportNames) {
      return reportNames;
    } else {
      throw Error(`Unable to get report names for report with ID ${screeningRequestRenterId}.`);
    }
  }

  public async create(renter: CreateRenterInput): Promise<{ renterId: number }> {
    const newRenter = await this.BaseAPI.callApi(this.endpoint, HTTP_METHODS.POST, renter);
    if (newRenter) {
      return newRenter;
    } else {
      throw Error('Unable to create renter.');
    }
  }

  public async update(renter: UpdateRenterInput) {
    const updatedRenter = await this.BaseAPI.callApi(this.endpoint, HTTP_METHODS.PUT, renter);

    if (updatedRenter) {
      return updatedRenter;
    } else {
      throw Error('Unable to update renter.');
    }
  }
}
