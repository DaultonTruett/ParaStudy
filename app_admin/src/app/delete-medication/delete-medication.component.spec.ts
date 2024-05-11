import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteMedicationComponent } from './delete-medication.component';

describe('DeleteMedicationComponent', () => {
  let component: DeleteMedicationComponent;
  let fixture: ComponentFixture<DeleteMedicationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeleteMedicationComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DeleteMedicationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
