import {
  Directive,
  OnInit,
  OnChanges,
  ElementRef,
  Renderer2
} from '@angular/core';

import { NmDropdownComponent } from './dropdown.component';

@Directive({
  selector: '[nm-dropdown-menu]'
})
export class NmDropdownMenuDirective implements OnInit, OnChanges {
  private classes: { [name: string]: boolean } = {};

  constructor(private elem: ElementRef, private renderer: Renderer2) {
  }

  ngOnInit() {
    this.setCurrentClasses();
    this.applyCurrentClasses();
  }

  ngOnChanges(): void {
    this.setCurrentClasses();
    this.applyCurrentClasses();
  }

  private setCurrentClasses(): void {
    this.classes = {
      'nm-dropdown-menu': true
    };
  }

  private applyCurrentClasses(): void {
    for (let [name, value] of Object.entries(this.classes)) {
      value && this.renderer.addClass(this.elem.nativeElement, name);
      !value && this.renderer.removeClass(this.elem.nativeElement, name);
    }
  }
}
