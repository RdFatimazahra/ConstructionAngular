import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TacheDialogComponent } from './tache-dialog.component';

describe('TacheDialogComponent', () => {
  let component: TacheDialogComponent;
  let fixture: ComponentFixture<TacheDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TacheDialogComponent]
    });
    fixture = TestBed.createComponent(TacheDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
