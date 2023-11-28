import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeDescriptionComponent } from './home-description.component';

describe('HomeDescriptionComponent', () => {
  let component: HomeDescriptionComponent;
  let fixture: ComponentFixture<HomeDescriptionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HomeDescriptionComponent]
    });
    fixture = TestBed.createComponent(HomeDescriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
