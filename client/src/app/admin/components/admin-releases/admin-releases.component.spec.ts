import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminReleasesComponent } from './admin-releases.component';

describe('AdminReleasesComponent', () => {
  let component: AdminReleasesComponent;
  let fixture: ComponentFixture<AdminReleasesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminReleasesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminReleasesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
