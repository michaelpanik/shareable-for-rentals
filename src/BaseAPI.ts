import fetch from "node-fetch";
import { HTTP_METHODS } from "./global.d";

class BaseAPI {
  private api_key: string;
  private client_id: string;
  private auth_token: string = "";
  private auth_token_expires: string = "";
  private rootUrl: string = "http://rentals-api-ext.baseBaseAPI.com/v1";

  constructor(options: {
    client_id: string;
    api_key: string;
    rootUrl?: string;
  }) {
    this.client_id = options.client_id;
    this.api_key = options.api_key;
    if (options.hasOwnProperty("rootUrl") && options.rootUrl) {
      this.rootUrl = options.rootUrl;
    }
  }

  public async getAuthToken() {
    const res = await fetch(`${this.rootUrl}/Tokens`, {
      method: "post",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        clientId: this.client_id,
        apiKey: this.api_key,
      }),
    });

    if (res.status == 200) {
      const { token, expires }: any = await res.json();

      this.auth_token = token;
      this.auth_token_expires = expires;
      return;
    } else {
      const json = await res.json();
      if (json) {
        throw new Error(JSON.stringify(json));
      }
    }
  }

  public async callApi(
    endpoint: string,
    method: HTTP_METHODS,
    body?: any
  ): Promise<any> {
    if (
      !this.auth_token ||
      new Date(this.auth_token_expires).getTime() < Date.now() + 300000
    ) {
      await this.getAuthToken();
    }

    let options: any = {
      method: method,
      headers: {
        "content-type": "application/json",
        authorization: this.auth_token,
      },
    };

    if (body) {
      options.body = JSON.stringify(body);
    }

    const res = await fetch(`${this.rootUrl}/${endpoint}`, options);
    if (res.status == 200) {
      const json = await res.json();
      return json;
    } else {
      const json = await res.json();
      if (json) {
        throw new Error(JSON.stringify(json));
      }
    }
  }
}

export default BaseAPI;
