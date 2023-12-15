import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserRegistrationForm } from './userRegistration-form.component';

describe('UserRegistrationForm', () => {
  let component: UserRegistrationForm;
  let fixture: ComponentFixture<UserRegistrationForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserRegistrationForm ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserRegistrationForm);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
