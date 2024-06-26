import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentExcelUploadComponent } from './student-excel-upload.component';

describe('StudentExcelUploadComponent', () => {
  let component: StudentExcelUploadComponent;
  let fixture: ComponentFixture<StudentExcelUploadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StudentExcelUploadComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(StudentExcelUploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
