import {
  Directive,
  Host,
  Input,
  OnInit,
  OnChanges,
  HostListener,
  ElementRef,
  Renderer2
} from '@angular/core';

import { NmMenuDirective } from './menu.directive';

@Directive({
  selector: '[nm-menu-item]'
})
export class NmMenuItemDirective implements OnInit, OnChanges {
  @Input() selected: boolean;
  @Input() disabled: boolean;

  private classes: { [name: string]: boolean } = {};

  constructor(private elem: ElementRef, private renderer: Renderer2, @Host() private menu: NmMenuDirective) {
    this.menu.addItem(this);
  }

  @HostListener('click', ['$event'])
  onClick(e: MouseEvent): void {
    if (this.disabled) {
      e.preventDefault();
      e.stopPropagation();
      return;
    }

    this.selected = true;
    this.menu.onClickItem(this);
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
      'nm-menu-item': true,
      'nm-menu-item-selected': this.selected,
      'nm-menu-item-disabled': this.disabled
    };
  }

  private applyCurrentClasses(): void {
    for (let [name, value] of Object.entries(this.classes)) {
      value && this.renderer.addClass(this.elem.nativeElement, name);
      !value && this.renderer.removeClass(this.elem.nativeElement, name);
    }
  }
}
