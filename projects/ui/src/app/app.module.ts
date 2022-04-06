import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';

import {AppComponent} from './app.component';
import {ModalComponent} from './components/modal/modal.component';
import {BackdropComponent} from './components/backdrop/backdrop.component';
import {ButtonComponent} from './components/button/button.component';
import {TextareaComponent} from './components/textarea/textarea.component';
import {FeedbackButtonComponent} from './components/feedback-button/feedback-button.component';

import {LoaderService} from './core/loader/loader.service';
import {ReadyForCreateService} from './core/ready-for-create.service';
import {ConfigService} from './services/config/config.service';
import {EventsService} from './core/events/events.service';
import {EventsListenerService} from './core/events-listener/events-listener.service';
import {FeedbackService} from './services/feedback/feedback.service';
import {ModalService} from './core/modal/modal.service';

@NgModule({
  declarations: [
    AppComponent,
    ModalComponent,
    BackdropComponent,
    ButtonComponent,
    TextareaComponent,
    FeedbackButtonComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [
    ReadyForCreateService,
    LoaderService,
    ConfigService,
    EventsService,
    EventsListenerService,
    FeedbackService,
    ModalService
  ],
  bootstrap: [AppComponent],
  entryComponents: [
    ModalComponent,
    BackdropComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule {
}
