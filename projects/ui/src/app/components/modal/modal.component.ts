import {ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import {takeUntil} from 'rxjs/operators';
import {Subject} from 'rxjs';

import {ConfigModel} from '../../models/config.model';

import {ConfigService} from '../../services/config/config.service';
import {EventsService} from '../../core/events/events.service';
import {FeedbackService} from '../../services/feedback/feedback.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit, OnDestroy {

  comment = '';
  feedbackServiceStatus: boolean | undefined;
  config: ConfigModel = new ConfigModel();

  unSubscribeAll$: Subject<null> = new Subject<null>();

  constructor(public configService: ConfigService,
              public eventService: EventsService,
              public feedbackService: FeedbackService,
              public cdr: ChangeDetectorRef) {
  }

  ngOnInit(): void {
    this.configService.getConfig$
      .pipe(takeUntil(this.unSubscribeAll$))
      .subscribe((response) => {
        if (response && response.id) {
          this.config = response;
        }
        this.cdr.markForCheck();
      });

    this.feedbackService.sendFeedbackSuccess$
      .pipe(takeUntil(this.unSubscribeAll$))
      .subscribe((response) => {
        this.feedbackServiceStatus = response.success;
        this.cdr.markForCheck();
      });
  }

  ngOnDestroy(): void {
    this.unSubscribeAll$.next();
    this.unSubscribeAll$.complete();
  }

  onClose(): void {
    this.comment = '';
    this.eventService.onCloseModalButtonClick();
  }

  setFeedbackComment(comment: string): void {
    this.comment = comment;
  }

  sendFeedbackComment(): void {
    this.eventService.onSendFeedbackButtonClick(this.comment);
  }
}

