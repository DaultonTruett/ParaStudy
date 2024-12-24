import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteMedicationDoseComponent } from './delete-medication-dose.component';

describe('DeleteMedicationDoseComponent', () => {
  let component: DeleteMedicationDoseComponent;
  let fixture: ComponentFixture<DeleteMedicationDoseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeleteMedicationDoseComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DeleteMedicationDoseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
