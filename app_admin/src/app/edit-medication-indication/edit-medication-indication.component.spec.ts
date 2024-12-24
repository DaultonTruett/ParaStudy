import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditMedicationIndicationComponent } from './edit-medication-indication.component';

describe('EditMedicationIndicationComponent', () => {
  let component: EditMedicationIndicationComponent;
  let fixture: ComponentFixture<EditMedicationIndicationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditMedicationIndicationComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditMedicationIndicationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
