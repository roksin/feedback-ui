import {ComponentFixture, TestBed} from '@angular/core/testing';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {BrowserModule} from '@angular/platform-browser';
import {Subject} from 'rxjs';
import {CommonModule} from '@angular/common';

import {AppComponent} from './app.component';

import {ConfigModel} from './models/config.model';

import {ConfigService} from './services/config/config.service';

const unSubscribe: Subject<null> = new Subject<null>();

describe('AppComponent', () => {
  let app: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let configService: ConfigService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        AppComponent
      ],
      imports: [CommonModule, BrowserModule, HttpClientTestingModule],
      providers: [ConfigService]
    }).compileComponents();

    configService = TestBed.inject(ConfigService);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    app = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the app', () => {
    expect(app).toBeTruthy();
  });

  it('should run ngOnInit', () => {
    app.ngOnInit();
    expect(app).toBeTruthy();
  });

  it('should get config for ready', () => {
    const config = new ConfigModel();
    config.id = 'test';
    configService._getConfig.next(config);
    configService.getConfig$.subscribe((response) => {
      if (response && response.id) {

      }
    }).unsubscribe();
    expect(app).toBeTruthy();
  });

  it('should be page destroy', () => {
    spyOn(unSubscribe, 'unsubscribe').and.callThrough();
    app.ngOnDestroy();
    expect(app).toBeTruthy();
  });
});
