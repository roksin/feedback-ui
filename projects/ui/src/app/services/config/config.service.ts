import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {tap} from 'rxjs/operators';

import {ConfigModel} from '../../models/config.model';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  private configUrl = 'https://app-x6j5nums4q-uc.a.run.app/api/config';

  _getConfig: BehaviorSubject<ConfigModel> = new BehaviorSubject<ConfigModel>(new ConfigModel());

  constructor(private http: HttpClient) {
  }

  get getConfig$(): Observable<ConfigModel> {
    return this._getConfig.asObservable();
  }

  getConfig(companyId: string): Observable<ConfigModel> {
    return this.http
      .get(`${this.configUrl}/${companyId}`)
      .pipe(
        tap((response: ConfigModel) => {
            this._getConfig.next(response);
          }
        )
      );
  }
}
