import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListAlgorithmsComponent } from './list-algorithms.component';

describe('ListAlgorithmsComponent', () => {
  let component: ListAlgorithmsComponent;
  let fixture: ComponentFixture<ListAlgorithmsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListAlgorithmsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ListAlgorithmsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
