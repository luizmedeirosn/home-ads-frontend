import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AboutUsDescriptionComponent } from './about-us-description.component';

describe('AboutUsDescriptionComponent', () => {
  let component: AboutUsDescriptionComponent;
  let fixture: ComponentFixture<AboutUsDescriptionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AboutUsDescriptionComponent]
    });
    fixture = TestBed.createComponent(AboutUsDescriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
