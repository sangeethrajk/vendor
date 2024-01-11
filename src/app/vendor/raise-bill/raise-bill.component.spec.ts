import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RaiseBillComponent } from './raise-bill.component';

describe('RaiseBillComponent', () => {
  let component: RaiseBillComponent;
  let fixture: ComponentFixture<RaiseBillComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RaiseBillComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RaiseBillComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
