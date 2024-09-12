import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageTachesComponent } from './manage-taches.component';

describe('ManageTachesComponent', () => {
  let component: ManageTachesComponent;
  let fixture: ComponentFixture<ManageTachesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ManageTachesComponent]
    });
    fixture = TestBed.createComponent(ManageTachesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
