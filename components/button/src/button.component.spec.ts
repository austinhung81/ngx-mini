import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { NmButtonModule } from './button.module';
import { NmButtonComponent } from './button.component';

describe('NmButtonComponent', () => {
  let component: NmButtonComponent;
  let fixture: ComponentFixture<NmButtonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        NmButtonModule
      ]
    });
    TestBed.compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NmButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should className correct', () => {
  });
});