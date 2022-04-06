import {
  Injectable
} from '@angular/core';

import {LoaderService} from './loader/loader.service';
import {ConfigService} from '../services/config/config.service';
import {EventsListenerService} from './events-listener/events-listener.service';

import {FeedbackButtonComponent} from '../components/feedback-button/feedback-button.component';

@Injectable({
  providedIn: 'root'
})
export class ReadyForCreateService {

  constructor(public loaderService: LoaderService<FeedbackButtonComponent>,
              public eventListenerService: EventsListenerService,
              private configService: ConfigService) {
  }

  nxInitialize(): void {
    this.loaderService.loader(FeedbackButtonComponent);
    this.eventListenerService.nxOnInit();
  }
}
