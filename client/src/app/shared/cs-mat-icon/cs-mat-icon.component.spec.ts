import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CsMatIconComponent } from './cs-mat-icon.component';

describe('CsMatIconComponent', () => {
  let component: CsMatIconComponent;
  let fixture: ComponentFixture<CsMatIconComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CsMatIconComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CsMatIconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
