import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdsHomeComponent } from './ads-home.component';

describe('AdsHomeComponent', () => {
  let component: AdsHomeComponent;
  let fixture: ComponentFixture<AdsHomeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdsHomeComponent]
    });
    fixture = TestBed.createComponent(AdsHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
