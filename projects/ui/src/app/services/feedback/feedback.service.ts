import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import {tap} from 'rxjs/operators';

import {FeedbackResponseModel} from '../../models/feedback-response.model';
import {FeedbackRequestModel} from '../../models/feedback-request.model';

@Injectable({
  providedIn: 'root'
})
export class FeedbackService {
  private feedbackUrl = 'https://app-x6j5nums4q-uc.a.run.app/api/feedback';

  _sendFeedbackSuccess: BehaviorSubject<FeedbackResponseModel> =
    new BehaviorSubject<FeedbackResponseModel>(new FeedbackResponseModel());

  constructor(private http: HttpClient) {
  }

  get sendFeedbackSuccess$(): Observable<FeedbackResponseModel> {
    return this._sendFeedbackSuccess.asObservable();
  }

  createFeedback(feedback: FeedbackRequestModel): Observable<any> {
    return this.http
      .post(`${this.feedbackUrl}`, feedback)
      .pipe(
        tap((response: FeedbackResponseModel) => {
            this._sendFeedbackSuccess.next(response);
          }
        )
      );
  }

}
