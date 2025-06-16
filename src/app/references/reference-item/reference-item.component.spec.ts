import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReferenceItemComponent } from './reference-item.component';

describe('ReferenceItemComponent', () => {
  let component: ReferenceItemComponent;
  let fixture: ComponentFixture<ReferenceItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReferenceItemComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ReferenceItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
