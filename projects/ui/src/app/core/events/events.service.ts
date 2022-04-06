import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';

import {FeedbackRequestModel} from '../../models/feedback-request.model';

import {FeedbackService} from '../../services/feedback/feedback.service';

@Injectable({
  providedIn: 'root'
})
export class EventsService {

  private _modalShowButtonAction$: BehaviorSubject<null> = new BehaviorSubject<null>(null);
  private _modalCloseButtonAction$: BehaviorSubject<null> = new BehaviorSubject<null>(null);

  constructor(private feedbackService: FeedbackService) {}

  get modalShowButtonAction$(): Observable<any> {
    return this._modalShowButtonAction$.asObservable();
  }

  get modalCloseButtonAction$(): Observable<any> {
    return this._modalCloseButtonAction$.asObservable();
  }

  onShowModalButtonClick(): void {
    this._modalShowButtonAction$.next(null);
  }

  onSendFeedbackButtonClick(commentStr: string): void {
    const feedbackReq = new FeedbackRequestModel();
    feedbackReq.feedback = commentStr;
    feedbackReq.companyId = 'try-1001';
    this.feedbackService.createFeedback(feedbackReq).subscribe();
  }

  onCloseModalButtonClick(): void {
    this.feedbackService._sendFeedbackSuccess.next({success: false});
    this._modalCloseButtonAction$.next(null);
  }
}

