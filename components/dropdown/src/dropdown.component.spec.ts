import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { NmDropdownModule } from './dropdown.module';
import { NmDropdownComponent } from './dropdown.component';

describe('NmDropdownComponent', () => {
  let component: NmDropdownComponent;
  let fixture: ComponentFixture<NmDropdownComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        NmDropdownModule
      ]
    });
    TestBed.compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NmDropdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should className correct', () => {
  });
});