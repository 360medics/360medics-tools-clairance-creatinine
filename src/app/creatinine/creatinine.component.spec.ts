import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatinineComponent } from './creatinine.component';

describe('CreatinineComponent', () => {
  let component: CreatinineComponent;
  let fixture: ComponentFixture<CreatinineComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreatinineComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreatinineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
