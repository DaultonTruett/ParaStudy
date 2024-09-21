import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudydeckComponent } from './studydeck.component';

describe('StudydeckComponent', () => {
  let component: StudydeckComponent;
  let fixture: ComponentFixture<StudydeckComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StudydeckComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(StudydeckComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
