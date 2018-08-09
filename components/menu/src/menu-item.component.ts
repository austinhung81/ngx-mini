import {
  Component,
  Host,
  Input,
  OnInit,
  OnChanges,
  HostListener,
  ElementRef,
  Renderer2,
  ViewChild
} from '@angular/core';

import { NmMenuDirective } from './menu.directive';

@Component({
  selector: '[nm-menu-item]',
  templateUrl: './menu-item.component.html'
})
export class NmMenuItemComponent implements OnInit, OnChanges {
  @Input() focus: boolean;
  @Input() active: boolean;
  @Input() selected: boolean;
  @Input() disabled: boolean;

  @ViewChild('link') link: ElementRef;

  protected classes: { [name: string]: boolean } = {};

  constructor(protected elem: ElementRef, protected renderer: Renderer2, @Host() protected menu: NmMenuDirective) {
    this.menu.addItem(this);
  }

  focusin() {
    this.focus = true;
    this.setCurrentClasses();
    this.applyCurrentClasses();
    this.link.nativeElement.focus();
  }

  focusout() {
    this.focus = false;
    this.setCurrentClasses();
    this.applyCurrentClasses();
    this.link.nativeElement.blur();
  }

  activate() {
    this.active = true;
    this.setCurrentClasses();
    this.applyCurrentClasses();
  }

  deactivate() {
    this.active = false;
    this.setCurrentClasses();
    this.applyCurrentClasses();
  }

  contains(node: Node):boolean {
    return this.elem.nativeElement.contains(node);
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

  protected setCurrentClasses(): void {
    this.classes = {
      'nm-menu-item': true,
      'active': this.active,
      'focus': this.focus,
      'nm-menu-selected': this.selected,
      'disabled': this.disabled
    };
  }

  protected applyCurrentClasses(): void {
    for (let [name, value] of Object.entries(this.classes)) {
      value && this.renderer.addClass(this.elem.nativeElement, name);
      !value && this.renderer.removeClass(this.elem.nativeElement, name);
    }
  }
}
