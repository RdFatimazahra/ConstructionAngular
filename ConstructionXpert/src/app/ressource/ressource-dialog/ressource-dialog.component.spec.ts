import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RessourceDialogComponent } from './ressource-dialog.component';

describe('RessourceDialogComponent', () => {
  let component: RessourceDialogComponent;
  let fixture: ComponentFixture<RessourceDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RessourceDialogComponent]
    });
    fixture = TestBed.createComponent(RessourceDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
