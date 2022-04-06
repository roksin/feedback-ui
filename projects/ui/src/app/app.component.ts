import {Component, OnDestroy, OnInit} from '@angular/core';

import {ReadyForCreateService} from './core/ready-for-create.service';
import {takeUntil} from 'rxjs/operators';
import {ConfigService} from './services/config/config.service';
import {Subject} from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {

  unSubscribe$: Subject<null> = new Subject<null>();

  constructor(private readyForCreateService: ReadyForCreateService, private configService: ConfigService) {
  }

  ngOnInit(): void {
    const companyId = `try-10001`; // we can get from url or token
    this.getConfig(companyId);
    this.configService.getConfig$
      .pipe(takeUntil(this.unSubscribe$))
      .subscribe((response) => {
        if (response && response.id) {
          this.readyForCreateService.nxInitialize();
        }
      });
  }

  ngOnDestroy(): void {
    this.unSubscribe$.next();
    this.unSubscribe$.complete();
  }

  getConfig(companyId: string): void {
    this.configService.getConfig(companyId).subscribe();
  }
}
