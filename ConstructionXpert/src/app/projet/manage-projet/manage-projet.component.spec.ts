import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageProjetsComponent } from './manage-projet.component';

describe('ManageProjetComponent', () => {
  let component: ManageProjetsComponent;
  let fixture: ComponentFixture<ManageProjetsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ManageProjetsComponent]
    });
    fixture = TestBed.createComponent(ManageProjetsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
