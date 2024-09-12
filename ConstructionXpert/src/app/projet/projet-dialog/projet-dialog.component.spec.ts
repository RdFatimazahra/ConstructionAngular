import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjetDialogComponent } from './projet-dialog.component';

describe('ProjetDialogComponent', () => {
  let component: ProjetDialogComponent;
  let fixture: ComponentFixture<ProjetDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProjetDialogComponent]
    });
    fixture = TestBed.createComponent(ProjetDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
