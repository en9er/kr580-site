import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminReleaseUploaderComponent } from './admin-release-uploader.component';

describe('AdminReleaseUploaderComponent', () => {
  let component: AdminReleaseUploaderComponent;
  let fixture: ComponentFixture<AdminReleaseUploaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminReleaseUploaderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminReleaseUploaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
