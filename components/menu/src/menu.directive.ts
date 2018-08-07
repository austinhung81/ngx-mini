import {
  Directive,
  OnInit,
  OnChanges,
  ElementRef,
  Renderer2,
  HostListener
} from '@angular/core';
import { Observable, Subject } from 'rxjs';

import { NmMenuItemComponent } from './menu-item.component';

@Directive({
  selector: '[nm-menu]'
})
export class NmMenuDirective implements OnInit, OnChanges {
  private mouseenter = new Subject<MouseEvent>();
  private mouseleave = new Subject<MouseEvent>();
  private click = new Subject<NmMenuItemComponent>();
  private arrowup = new Subject<KeyboardEvent>();
  private arrowdown = new Subject<KeyboardEvent>();
  private escape = new Subject<KeyboardEvent>();

  mouseenter$: Observable<MouseEvent> = this.mouseenter.asObservable();
  mouseleave$: Observable<MouseEvent> = this.mouseleave.asObservable();
  click$: Observable<NmMenuItemComponent> = this.click.asObservable();
  arrowup$: Observable<KeyboardEvent> = this.arrowup.asObservable();
  arrowdown$: Observable<KeyboardEvent> = this.arrowdown.asObservable();
  escape$: Observable<KeyboardEvent> = this.escape.asObservable();

  private classes: { [name: string]: boolean } = {};
  private currentActiveItemIndex = -1;

  readonly items: NmMenuItemComponent[] = [];

  constructor(private elem: ElementRef, private renderer: Renderer2) {
  }

  activateItem(seed: number) {
    this.deactivateAllItems();
    this.currentActiveItemIndex = this.currentActiveItemIndex + seed + this.items.length;
    this.currentActiveItemIndex = this.currentActiveItemIndex % this.items.length;
    if (this.items[this.currentActiveItemIndex].disabled) {
      return this.activateItem(seed);
    }
    this.items[this.currentActiveItemIndex].activate();
  }

  deactivateAllItems() {
    this.items.forEach(item => item.deactivate());
  }

  resetCurrentActiveItemIndex() {
    this.currentActiveItemIndex = -1;
  }

  addItem(item: NmMenuItemComponent) {
    this.items.push(item);
  }

  onClickItem(item: NmMenuItemComponent) {
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

  @HostListener('keydown.arrowup', ['$event'])
  onKeydownArrowUp(e: KeyboardEvent): void {
    this.arrowup.next(e);
  }

  @HostListener('keydown.arrowdown', ['$event'])
  onKeydownArrowDown(e: KeyboardEvent): void {
    this.arrowdown.next(e);
  }

  @HostListener('keyup.esc', ['$event'])
  onKeyupEsc(e: KeyboardEvent): void {
    this.escape.next(e);
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
