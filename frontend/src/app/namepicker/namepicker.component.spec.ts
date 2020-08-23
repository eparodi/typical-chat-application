import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NamepickerComponent } from './namepicker.component';

describe('NamepickerComponent', () => {
  let component: NamepickerComponent;
  let fixture: ComponentFixture<NamepickerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NamepickerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NamepickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
