import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PullBureauDataComponent } from './pull-bureau-data.component';

describe('PullBureauDataComponent', () => {
  let component: PullBureauDataComponent;
  let fixture: ComponentFixture<PullBureauDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PullBureauDataComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PullBureauDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
