import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HatraahComponent } from './hatraah.component';

describe('HatraahComponent', () => {
  let component: HatraahComponent;
  let fixture: ComponentFixture<HatraahComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HatraahComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HatraahComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
