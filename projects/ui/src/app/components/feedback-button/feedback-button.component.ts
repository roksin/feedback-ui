import {ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';

import {ConfigModel} from '../../models/config.model';

import {ConfigService} from '../../services/config/config.service';
import {EventsService} from '../../core/events/events.service';

@Component({
  selector: 'app-feedback-button',
  templateUrl: './feedback-button.component.html',
  styleUrls: ['./feedback-button.component.scss']
})
export class FeedbackButtonComponent implements OnInit, OnDestroy {

  config: ConfigModel = new ConfigModel();
  image = '';

  unSubscribe$: Subject<null> = new Subject<null>();

  constructor(private eventService: EventsService,
              private configService: ConfigService,
              private cdr: ChangeDetectorRef
  ) {
  }

  ngOnInit(): void {
    this.configService.getConfig$
      .pipe(takeUntil(this.unSubscribe$))
      .subscribe((response) => {
        if (response && response.id) {
          this.config = response;
          this.image = `${this.config.url}${this.config.image}`;
        }
        this.cdr.markForCheck();
      });

  }

  ngOnDestroy(): void {
    this.unSubscribe$.next();
    this.unSubscribe$.complete();
  }

  openFeedbackModal(): void {
    this.eventService.onShowModalButtonClick();
  }

}
