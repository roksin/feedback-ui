import {ComponentFixture, TestBed} from '@angular/core/testing';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';

import {ModalComponent} from './modal.component';
import {NO_ERRORS_SCHEMA} from '@angular/core';
import {EventsService} from '../../core/events/events.service';
import {BrowserModule} from '@angular/platform-browser';
import {CommonModule} from '@angular/common';
import {ConfigModel} from '../../models/config.model';
import {ConfigService} from '../../services/config/config.service';

describe('ModalComponent', () => {
  let component: ModalComponent;
  let fixture: ComponentFixture<ModalComponent>;
  let service: ConfigService;
  let httpMock: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ModalComponent],
      imports: [HttpClientTestingModule, CommonModule, BrowserModule],
      providers: [EventsService, ConfigService],
      schemas: [NO_ERRORS_SCHEMA]
    })
      .compileComponents();

    service = TestBed.inject(ConfigService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get config', () => {
    const config = new ConfigModel();
    config.id = 'test';
    config.image = 'feedback.png';
    config.modalOpenButtonText = '';
    config.url = './assets/image/';
    config.modalHeaderText = 'SEND YOUR FEEDBACK';
    config.sendFeedbackButtonText = 'Send Feedback';
    service._getConfig.next(config);
    service.getConfig$.subscribe((response) => {
      if (response && response.id) {
        expect(component.config).toEqual(config);
        fixture.detectChanges();
      }
    }).unsubscribe();
    expect(component).toBeTruthy();
  });

  it('should click on close button', () => {
    component.onClose();
    component.eventService.onCloseModalButtonClick();
    expect(component).toBeTruthy();
  });

  it('should click set feedback comment', () => {
    const str = 'test';
    component.setFeedbackComment(str);
    component.comment = str;
    expect(component.comment).toEqual(str);
    fixture.detectChanges();
  });

  it('should click send feedback', () => {
    const str = 'test';
    component.sendFeedbackComment();
    component.eventService.onSendFeedbackButtonClick(str);
    expect(component).toBeTruthy();
  });
});
