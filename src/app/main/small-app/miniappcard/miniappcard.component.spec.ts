import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MiniappcardComponent } from './miniappcard.component';

describe('MiniappcardComponent', () => {
  let component: MiniappcardComponent;
  let fixture: ComponentFixture<MiniappcardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MiniappcardComponent]
    });
    fixture = TestBed.createComponent(MiniappcardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
