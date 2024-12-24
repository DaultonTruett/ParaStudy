import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditMedicationDoseComponent } from './edit-medication-dose.component';

describe('EditMedicationDoseComponent', () => {
  let component: EditMedicationDoseComponent;
  let fixture: ComponentFixture<EditMedicationDoseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditMedicationDoseComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditMedicationDoseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
