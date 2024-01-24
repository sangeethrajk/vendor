import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewEditProjectComponent } from './view-edit-project.component';

describe('ViewEditProjectComponent', () => {
  let component: ViewEditProjectComponent;
  let fixture: ComponentFixture<ViewEditProjectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ViewEditProjectComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ViewEditProjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
