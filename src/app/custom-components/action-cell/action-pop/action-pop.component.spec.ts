import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActionPopComponent } from './action-pop.component';

describe('DeletePopComponent', () => {
  let component: ActionPopComponent;
  let fixture: ComponentFixture<ActionPopComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActionPopComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ActionPopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
