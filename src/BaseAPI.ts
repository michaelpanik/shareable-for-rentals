import fetch from 'node-fetch';
import { HTTP_METHODS } from './global.d';

class BaseAPI {
  private apiKey: string;
  private clientId: string;
  private authToken: string = '';
  private authTokenExpires: string = '';
  private rootUrl: string = 'http://rentals-api-ext.baseBaseAPI.com/v1';

  constructor(options: { client_id: string; api_key: string; rootUrl?: string }) {
    this.clientId = options.client_id;
    this.apiKey = options.api_key;
    if (options.hasOwnProperty('rootUrl') && options.rootUrl) {
      this.rootUrl = options.rootUrl;
    }
  }

  public async getAuthToken() {
    const res = await fetch(`${this.rootUrl}/Tokens`, {
      method: 'post',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        clientId: this.clientId,
        apiKey: this.apiKey,
      }),
    });

    if (res.status === 200) {
      const { token, expires }: any = await res.json();

      this.authToken = token;
      this.authTokenExpires = expires;
      return;
    } else {
      const json = await res.json();
      if (json) {
        throw new Error(JSON.stringify(json));
      }
    }
  }

  public async callApi(endpoint: string, method: HTTP_METHODS, body?: any): Promise<any> {
    if (!this.authToken || new Date(this.authTokenExpires).getTime() < Date.now() + 300000) {
      await this.getAuthToken();
    }

    const options: any = {
      method,
      headers: {
        'content-type': 'application/json',
        authorization: this.authToken,
      },
    };

    if (body) {
      options.body = JSON.stringify(body);
    }

    const res = await fetch(`${this.rootUrl}/${endpoint}`, options);
    if (res.status === 200) {
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
