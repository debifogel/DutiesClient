import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ToranimComponent } from './toranim.component';

describe('ToranimComponent', () => {
  let component: ToranimComponent;
  let fixture: ComponentFixture<ToranimComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ToranimComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ToranimComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
