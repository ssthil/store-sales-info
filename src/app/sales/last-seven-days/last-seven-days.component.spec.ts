import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LastSevenDaysComponent } from './last-seven-days.component';

describe('LastSevenDaysComponent', () => {
  let component: LastSevenDaysComponent;
  let fixture: ComponentFixture<LastSevenDaysComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LastSevenDaysComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LastSevenDaysComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
