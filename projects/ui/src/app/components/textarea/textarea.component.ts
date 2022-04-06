import {Component, EventEmitter, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-textarea',
  templateUrl: './textarea.component.html',
  styleUrls: ['./textarea.component.scss']
})
export class TextareaComponent implements OnInit {

  @Output()
  feedbackComment: EventEmitter<string> = new EventEmitter<string>();

  comment = '';

  constructor() {
  }

  ngOnInit(): void {
  }

  setComment(commentStr: string): void {
    this.feedbackComment.emit(commentStr);
  }
}

