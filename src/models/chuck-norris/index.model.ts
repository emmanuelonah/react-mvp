import { HttpService } from 'services';

import { ChuckNorrisJokeResponse } from 'ChuckNorrisTypes';

export class ChuckNorrisModel {
  private httpService = new HttpService({ baseURL: 'https://api.chucknorris.io/' });

  public getChuckNorrisJoke() {
    return this.httpService.httpGetRequest<ChuckNorrisJokeResponse>('jokes/random');
  }
}
