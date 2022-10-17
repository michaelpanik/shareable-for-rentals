import BaseAPI from "./BaseAPI";
import { HTTP_METHODS } from "./global.d";
import { Property } from "./Properties.d";

export class Properties {
  private BaseAPI: BaseAPI;

  constructor(baseApi: BaseAPI) {
    this.BaseAPI = baseApi;
  }

  private getEndpoint(landlordId: number) {
    return `Landlords/${landlordId}/Properties`;
  }

  public async getOne(
    landlordId: number,
    propertyId: number
  ): Promise<Property> {
    const property = await this.BaseAPI.callApi(
      this.getEndpoint(landlordId) + `/${propertyId}`,
      HTTP_METHODS.GET
    );
    if (property.propertyId) {
      return property;
    } else {
      throw new Error(JSON.stringify(property));
    }
  }

  public async getAll(
    landlordId: number,
    pageNumber: number = 0,
    pageSize: number = 10
  ): Promise<Property[]> {
    const params = new URLSearchParams();
    params.append("pageNumber", pageNumber.toString());
    params.append("pageSize", pageSize.toString());

    const property = await this.BaseAPI.callApi(
      this.getEndpoint(landlordId) + "?" + params.toString(),
      HTTP_METHODS.GET
    );
    if (property.propertyId) {
      return property;
    } else {
      throw new Error(JSON.stringify(property));
    }
  }

  public async create(landlordId: number, property: Property) {
    const newProperty = await this.BaseAPI.callApi(
      this.getEndpoint(landlordId),
      HTTP_METHODS.POST,
      property
    );
    if (newProperty.propertyId) {
      return newProperty;
    } else {
      throw new Error(JSON.stringify(newProperty));
    }
  }

  public async update(landlordId: number, property: Property) {
    const updatedProperty = await this.BaseAPI.callApi(
      this.getEndpoint(landlordId),
      HTTP_METHODS.PUT,
      property
    );
    if (updatedProperty.propertyId) {
      return updatedProperty;
    } else {
      throw new Error(JSON.stringify(updatedProperty));
    }
  }
}
