import { ComponentFixture, TestBed } from '@angular/core/testing';

import { myprofileComponent } from './myprofile.component';

describe('MyprofileComponent', () => {
  let component: myprofileComponent;
  let fixture: ComponentFixture<myprofileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [myprofileComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(myprofileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
