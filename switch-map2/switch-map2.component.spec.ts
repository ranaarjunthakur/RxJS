import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SwitchMap2Component } from './switch-map2.component';

describe('SwitchMap2Component', () => {
  let component: SwitchMap2Component;
  let fixture: ComponentFixture<SwitchMap2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SwitchMap2Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SwitchMap2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
