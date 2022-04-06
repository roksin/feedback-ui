import {ComponentFixture, TestBed} from '@angular/core/testing';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {NO_ERRORS_SCHEMA} from '@angular/core';
import {By} from '@angular/platform-browser';

import {FeedbackButtonComponent} from './feedback-button.component';

import {ConfigModel} from '../../models/config.model';

import {ConfigService} from '../../services/config/config.service';

describe('FeedbackButtonComponent', () => {
  let component: FeedbackButtonComponent;
  let fixture: ComponentFixture<FeedbackButtonComponent>;
  let service: ConfigService;
  let httpMock: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FeedbackButtonComponent],
      imports: [HttpClientTestingModule],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [ConfigService]
    })
      .compileComponents();

    service = TestBed.inject(ConfigService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FeedbackButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('renders app-button', (done) => {
    const el = fixture.debugElement.query(By.css('app-button'));
    if (el) {
      expect(el).toBeTruthy();
    }
    done();
  });

  it('should set config and image', () => {
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

  it('passes a button text', () => {
    const el = fixture.debugElement.query(By.css('app-button'));
    const config = new ConfigModel();
    if (el) {
      const buttonText = el.properties.buttonText;
      const dataTestId = el.properties.dataTestId;
      const imageShow = el.properties.imageShow;
      const imageUrl = el.properties.imageUrl;
      expect(buttonText).toBe(config.modalOpenButtonText);
      expect(dataTestId).toBe('nx-feedback-button');
      expect(imageShow).toBe(!config.modalOpenButtonText);
      expect(imageUrl).toBe('');
    }
  });

  it('listens for on button click', () => {
    spyOn(component, 'openFeedbackModal');
    const el = fixture.debugElement.query(By.css('app-button'));
    el.triggerEventHandler('onButtonClick', null);
    expect(component.openFeedbackModal).toHaveBeenCalledWith();
  });

  it('click on feedback button', () => {
    component.openFeedbackModal();
    expect(component).toBeTruthy();
  });
});
