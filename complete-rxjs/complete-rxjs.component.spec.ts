import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompleteRxjsComponent } from './complete-rxjs.component';

describe('CompleteRxjsComponent', () => {
  let component: CompleteRxjsComponent;
  let fixture: ComponentFixture<CompleteRxjsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompleteRxjsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CompleteRxjsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
