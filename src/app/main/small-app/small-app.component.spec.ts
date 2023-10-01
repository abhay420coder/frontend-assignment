import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SmallAppComponent } from './small-app.component';

describe('SmallAppComponent', () => {
  let component: SmallAppComponent;
  let fixture: ComponentFixture<SmallAppComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SmallAppComponent]
    });
    fixture = TestBed.createComponent(SmallAppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
