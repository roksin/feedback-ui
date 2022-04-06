import {TestBed} from '@angular/core/testing';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {Subject} from 'rxjs';

import {EventsListenerService} from './events-listener.service';

const unSubscribe: Subject<null> = new Subject<null>();

describe('EventsListenerService', () => {
  let service: EventsListenerService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(EventsListenerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should be service destroy', () => {
    spyOn(unSubscribe, 'unsubscribe').and.callThrough();
    service.ngOnDestroy();
    expect(service).toBeTruthy();
  });

  it('should be service init', () => {
    service.nxOnInit();
    expect(service).toBeTruthy();
  });
});
