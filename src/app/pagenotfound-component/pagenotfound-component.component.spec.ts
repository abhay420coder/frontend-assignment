import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PagenotfoundComponentComponent } from './pagenotfound-component.component';

describe('PagenotfoundComponentComponent', () => {
  let component: PagenotfoundComponentComponent;
  let fixture: ComponentFixture<PagenotfoundComponentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PagenotfoundComponentComponent]
    });
    fixture = TestBed.createComponent(PagenotfoundComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
