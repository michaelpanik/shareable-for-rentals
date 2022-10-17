import BaseAPI from "./BaseAPI";
import { Landlords } from "./Landlords";
import { Properties } from "./Properties";
import { Renters } from "./Renters";

export class ShareAble {
  private BaseAPI: BaseAPI;
  public Landlords: Landlords;
  public Renters: Renters;
  public Properties: Properties;

  constructor(options: { client_id: string; api_key: string }) {
    this.BaseAPI = new BaseAPI(options);
    this.Landlords = new Landlords(this.BaseAPI);
    this.Renters = new Renters(this.BaseAPI);
    this.Properties = new Properties(this.BaseAPI);
  }
}
