import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageProjetComponent } from './manage-projet.component';

describe('ManageProjetComponent', () => {
  let component: ManageProjetComponent;
  let fixture: ComponentFixture<ManageProjetComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ManageProjetComponent]
    });
    fixture = TestBed.createComponent(ManageProjetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
