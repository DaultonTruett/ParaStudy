import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddMedicationDoseComponent } from './add-medication-dose.component';

describe('AddMedicationDoseComponent', () => {
  let component: AddMedicationDoseComponent;
  let fixture: ComponentFixture<AddMedicationDoseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddMedicationDoseComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddMedicationDoseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
