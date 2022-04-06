import {ComponentFixture, TestBed} from '@angular/core/testing';
import {FormsModule} from '@angular/forms';

import {TextareaComponent} from './textarea.component';
import {By} from '@angular/platform-browser';


describe('TextareaComponent', () => {
  let component: TextareaComponent;
  let fixture: ComponentFixture<TextareaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TextareaComponent],
      imports: [FormsModule]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TextareaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit textarea value', () => {
    const str = 'test';
    component.setComment(str);
    component.feedbackComment.emit(str);
    expect(component).toBeTruthy();
  });

  it('should set value to textarea', () => {
    const textarea = fixture.debugElement.query(By.css('#feedbackComment'));
    textarea.nativeElement.value = 'testing comment value';
    textarea.nativeElement.dispatchEvent(new Event('input'));
    expect(textarea.nativeElement.value).toBe('testing comment value');
    fixture.detectChanges();
  });
});
