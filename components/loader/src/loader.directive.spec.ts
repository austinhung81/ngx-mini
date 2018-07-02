import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { NmLoaderModule } from './loader.module';
import { NmLoaderComponent } from './loader.directive';

describe('NmLoaderDirective', () => {
  let component: NmLoaderComponent;
  let fixture: ComponentFixture<NmLoaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        NmLoaderModule
      ]
    });
    TestBed.compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NmLoaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should className correct', () => {
  });
});