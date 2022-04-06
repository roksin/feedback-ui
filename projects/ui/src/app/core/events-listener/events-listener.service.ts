import {Injectable, OnDestroy} from '@angular/core';
import {takeUntil} from 'rxjs/operators';
import {Subject} from 'rxjs';

import {EventsService} from '../events/events.service';
import {ModalService} from '../modal/modal.service';

@Injectable({
  providedIn: 'root'
})
export class EventsListenerService implements OnDestroy {

  unSubscribeAll$: Subject<any> = new Subject<any>();

  constructor(private eventService: EventsService,
              private modalService: ModalService) {
  }

  nxOnInit(): void {
    this.onShowButtonObserve();
    this.onCloseButtonObserve();
  }

  ngOnDestroy(): void {
    this.unSubscribeAll$.next();
    this.unSubscribeAll$.subscribe();
  }

  onShowButtonObserve(): void {
    this.eventService.modalShowButtonAction$
      .pipe(takeUntil(this.unSubscribeAll$))
      .subscribe(() => {
        this.modalService.modalShow();
      });
  }

  onCloseButtonObserve(): void {
    this.eventService.modalCloseButtonAction$
      .pipe(takeUntil(this.unSubscribeAll$))
      .subscribe(() => {
        this.modalService.modalClose();
      });
  }
}
