import {TestBed} from '@angular/core/testing';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';

import {ConfigService} from './config.service';
import {ConfigModel} from '../../models/config.model';

const configUrl = 'http://localhost:8080/api/config';
const serverResponse: ConfigModel = new ConfigModel();

describe('ConfigService', () => {
  let service: ConfigService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(ConfigService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get config', () => {
    let configModel;
    const companyId = 'try-1001';
    service.getConfig(companyId).subscribe();
    service.getConfig$.subscribe((response) => {
      configModel = response;
    }).unsubscribe();

    const request = httpMock.expectOne({method: 'GET', url: `${configUrl}/${companyId}`});
    request.flush(serverResponse);
    httpMock.verify();

    expect(configModel).toEqual(serverResponse as any);
  });
});
