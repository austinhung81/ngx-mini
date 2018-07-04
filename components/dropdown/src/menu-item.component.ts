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
import { Observable, Subject } from 'rxjs';

import { NmMenuDirective } from './menu.directive';

@Component({
  selector: '[nm-menu-item]',
  templateUrl: './menu-item.component.html'
})
export class NmMenuItemComponent implements OnInit, OnChanges {
  @Input() active: boolean;
  @Input() selected: boolean;
  @Input() disabled: boolean;

  @ViewChild('link') link: ElementRef;

  private classes: { [name: string]: boolean } = {};

  constructor(private elem: ElementRef, private renderer: Renderer2, @Host() private menu: NmMenuDirective) {
    this.menu.addItem(this);
  }

  activate() {
    this.active = true;
    this.setCurrentClasses();
    this.applyCurrentClasses();
    this.link.nativeElement.focus();
  }

  inactivate() {
    this.active = false;
    this.setCurrentClasses();
    this.applyCurrentClasses();
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
      'active': this.active,
      'nm-menu-selected': this.selected,
      'disabled': this.disabled
    };
  }

  private applyCurrentClasses(): void {
    for (let [name, value] of Object.entries(this.classes)) {
      value && this.renderer.addClass(this.elem.nativeElement, name);
      !value && this.renderer.removeClass(this.elem.nativeElement, name);
    }
  }
}
