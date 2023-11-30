import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AboutUsHomeComponent } from './about-us-home.component';

describe('AboutUsHomeComponent', () => {
  let component: AboutUsHomeComponent;
  let fixture: ComponentFixture<AboutUsHomeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AboutUsHomeComponent]
    });
    fixture = TestBed.createComponent(AboutUsHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
