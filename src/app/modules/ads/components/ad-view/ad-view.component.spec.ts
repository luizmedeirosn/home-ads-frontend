import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdViewComponent } from './ad-view.component';

describe('AdViewComponent', () => {
  let component: AdViewComponent;
  let fixture: ComponentFixture<AdViewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdViewComponent]
    });
    fixture = TestBed.createComponent(AdViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
