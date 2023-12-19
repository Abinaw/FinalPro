import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModuleToggleComponent } from './module-toggle.component';

describe('ModuleToggleComponent', () => {
  let component: ModuleToggleComponent;
  let fixture: ComponentFixture<ModuleToggleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModuleToggleComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModuleToggleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
