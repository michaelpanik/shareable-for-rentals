import { Landlord } from "./Landlords.d";
import BaseAPI from "./BaseAPI";
import { HTTP_METHODS, REPORT_TYPES, REQUESTED_PRODUCTS } from "./global.d";

export class Landlords {
  private endpoint: string = "Landlords";
  private BaseAPI: BaseAPI;

  constructor(baseApi: BaseAPI) {
    this.BaseAPI = baseApi;
  }

  public async getOne(landlordId: number): Promise<Landlord> {
    const landlord: Landlord = await this.BaseAPI.callApi(
      `${this.endpoint}/${landlordId}`,
      HTTP_METHODS.GET
    );

    if (landlord) {
      return landlord;
    } else {
      throw Error("Unable to get landlord.");
    }
  }

  public async getReport(
    screeningRequestRenterId: number,
    requestedProduct?: REQUESTED_PRODUCTS,
    reportType?: REPORT_TYPES
  ) {
    let params = new URLSearchParams();

    if (requestedProduct) {
      params.append("requestedProduct", requestedProduct);
    }

    if (reportType) {
      params.append("reportType", reportType);
    }

    const renter = await this.BaseAPI.callApi(
      `${
        this.endpoint
      }/ScreeningRequestRenters/${screeningRequestRenterId}/Reports${params.toString()}`,
      HTTP_METHODS.GET
    );
    if (renter) {
      return renter;
    } else {
      throw Error(`Unable to get report with ID ${screeningRequestRenterId}.`);
    }
  }

  public async getAvailableReportNames(
    screeningRequestRenterId: number
  ): Promise<string[]> {
    const reportNames = await this.BaseAPI.callApi(
      `${this.endpoint}/ScreeningRequestRenters/${screeningRequestRenterId}/Reports/Names`,
      HTTP_METHODS.GET
    );

    if (reportNames) {
      return reportNames;
    } else {
      throw Error(
        `Unable to get report names for report with ID ${screeningRequestRenterId}.`
      );
    }
  }

  public async create(landlord: Landlord): Promise<{ landlordId: number }> {
    const newLandlord = await this.BaseAPI.callApi(
      this.endpoint,
      HTTP_METHODS.POST,
      landlord
    );
    if (landlord) {
      return newLandlord;
    } else {
      throw Error("Unable to create landlord.");
    }
  }

  public async update(landlord: Landlord): Promise<{ landlordId: number }> {
    const updatedLandlord = await this.BaseAPI.callApi(
      this.endpoint,
      HTTP_METHODS.PUT,
      landlord
    );
    if (landlord) {
      return updatedLandlord;
    } else {
      throw Error("Unable to update landlord.");
    }
  }
}
