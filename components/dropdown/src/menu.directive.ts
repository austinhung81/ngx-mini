import {
  Directive,
  OnInit,
  OnChanges,
  ElementRef,
  Renderer2,
  HostListener
} from '@angular/core';
import { Observable, Subject } from 'rxjs';

import { NmMenuItemDirective } from './menu-item.directive';

@Directive({
  selector: '[nm-menu]'
})
export class NmMenuDirective implements OnInit, OnChanges {
  private mouseenter = new Subject<MouseEvent>();
  private mouseleave = new Subject<MouseEvent>();
  private click = new Subject<NmMenuItemDirective>();

  mouseenter$: Observable<MouseEvent> = this.mouseenter.asObservable();
  mouseleave$: Observable<MouseEvent> = this.mouseleave.asObservable();
  click$: Observable<NmMenuItemDirective> = this.click.asObservable();

  private classes: { [name: string]: boolean } = {};

  readonly items: NmMenuItemDirective[] = [];

  constructor(private elem: ElementRef, private renderer: Renderer2) {
  }

  addItem(item: NmMenuItemDirective) {
    this.items.push(item);
  }

  onClickItem(item: NmMenuItemDirective) {
    this.click.next(item);
  }

  @HostListener('mouseenter', ['$event'])
  onMouseEnter(e: MouseEvent): void {
    this.mouseenter.next(e);
  }

  @HostListener('mouseleave', ['$event'])
  onMouseLeave(e: MouseEvent): void {
    this.mouseleave.next(e);
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
      'nm-menu': true
    };
  }

  private applyCurrentClasses(): void {
    for (let [name, value] of Object.entries(this.classes)) {
      value && this.renderer.addClass(this.elem.nativeElement, name);
      !value && this.renderer.removeClass(this.elem.nativeElement, name);
    }
  }
}
