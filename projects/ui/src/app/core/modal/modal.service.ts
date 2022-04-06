import {ComponentRef, Injectable} from '@angular/core';

import {ModalComponent} from '../../components/modal/modal.component';
import {BackdropComponent} from '../../components/backdrop/backdrop.component';

import {LoaderService} from '../loader/loader.service';

@Injectable({
  providedIn: 'root'
})
export class ModalService {
  private modalRef: ComponentRef<ModalComponent> | undefined;
  private backdropRef: ComponentRef<BackdropComponent> | undefined;

  constructor(private loaderService: LoaderService<any>) {
  }

  modalShow(): void {
    this.backdropRef = this.loaderService.loader(BackdropComponent);
    this.modalRef = this.loaderService.loader(ModalComponent);
  }

  modalClose(): void {
    this.modalRef?.destroy();
    this.backdropRef?.destroy();
  }
}
