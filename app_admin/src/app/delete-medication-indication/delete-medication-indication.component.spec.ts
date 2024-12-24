import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteMedicationIndicationComponent } from './delete-medication-indication.component';

describe('DeleteMedicationIndicationComponent', () => {
  let component: DeleteMedicationIndicationComponent;
  let fixture: ComponentFixture<DeleteMedicationIndicationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeleteMedicationIndicationComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DeleteMedicationIndicationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
