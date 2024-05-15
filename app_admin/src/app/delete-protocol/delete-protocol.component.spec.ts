import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteProtocolComponent } from './delete-protocol.component';

describe('DeleteProtocolComponent', () => {
  let component: DeleteProtocolComponent;
  let fixture: ComponentFixture<DeleteProtocolComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeleteProtocolComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DeleteProtocolComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
