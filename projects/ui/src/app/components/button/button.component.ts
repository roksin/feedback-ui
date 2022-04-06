import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})
export class ButtonComponent implements OnInit {

  @Input()
  buttonText: string | undefined;

  @Input()
  dataTestId: string | undefined;

  @Input()
  imageShow: boolean | undefined;

  @Input()
  imageUrl: string | undefined;

  @Output()
  onButtonClick: EventEmitter<null> = new EventEmitter<null>();

  constructor() {
  }

  ngOnInit(): void {
  }

  buttonClick(): void {
    this.onButtonClick.emit();
  }
}

