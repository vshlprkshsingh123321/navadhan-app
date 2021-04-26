import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PassThroughSheetComponent } from './pass-through-sheet.component';

describe('PassThroughSheetComponent', () => {
  let component: PassThroughSheetComponent;
  let fixture: ComponentFixture<PassThroughSheetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PassThroughSheetComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PassThroughSheetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
