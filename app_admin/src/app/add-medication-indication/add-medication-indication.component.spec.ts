import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddMedicationIndicationComponent } from './add-medication-indication.component';

describe('AddMedicationIndicationComponent', () => {
  let component: AddMedicationIndicationComponent;
  let fixture: ComponentFixture<AddMedicationIndicationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddMedicationIndicationComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddMedicationIndicationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
