import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MiniapplistComponent } from './miniapplist.component';

describe('MiniapplistComponent', () => {
  let component: MiniapplistComponent;
  let fixture: ComponentFixture<MiniapplistComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MiniapplistComponent]
    });
    fixture = TestBed.createComponent(MiniapplistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
