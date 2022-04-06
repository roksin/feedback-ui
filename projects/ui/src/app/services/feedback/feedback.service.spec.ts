import {TestBed} from '@angular/core/testing';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';

import {FeedbackService} from './feedback.service';
import {FeedbackRequestModel} from '../../models/feedback-request.model';
import {FeedbackResponseModel} from '../../models/feedback-response.model';

const feedbackUrl = 'http://localhost:8080/api/feedback';
const reponse = new FeedbackResponseModel();

describe('FeedbackService', () => {
  let service: FeedbackService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(FeedbackService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should send feedback', () => {
    const feedbackRequestModel = new FeedbackRequestModel();
    let feedbackResponse = new FeedbackResponseModel();
    feedbackRequestModel.feedback = 'test';
    feedbackRequestModel.companyId = 'try-1001';
    service.createFeedback(feedbackRequestModel).subscribe();
    service
      .sendFeedbackSuccess$
      .subscribe((res) => {
        feedbackResponse = res;
      })
      .unsubscribe();

    const req = httpMock.expectOne({
      method: 'POST',
      url: feedbackUrl,
    });

    req.flush(reponse);
    httpMock.verify();

    expect(feedbackResponse).toEqual(reponse as any);
  });
});
