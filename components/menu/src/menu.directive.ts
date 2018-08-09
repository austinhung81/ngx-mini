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
  private focus = new Subject<KeyboardEvent>();

  mouseenter$: Observable<MouseEvent> = this.mouseenter.asObservable();
  mouseleave$: Observable<MouseEvent> = this.mouseleave.asObservable();
  click$: Observable<NmMenuItemComponent> = this.click.asObservable();
  arrowup$: Observable<KeyboardEvent> = this.arrowup.asObservable();
  arrowdown$: Observable<KeyboardEvent> = this.arrowdown.asObservable();
  escape$: Observable<KeyboardEvent> = this.escape.asObservable();
  focus$: Observable<KeyboardEvent> = this.focus.asObservable();

  private classes: { [name: string]: boolean } = {};
  private currentActiveItemIndex = -1;
  private currentFocusItemIndex = -1;

  readonly items: NmMenuItemComponent[] = [];

  constructor(private elem: ElementRef, private renderer: Renderer2) {
  }

  focusin(seed: number) {
    this.focusout();
    this.currentFocusItemIndex = this.calcNextAvailableItemIndex(this.currentFocusItemIndex, seed);
    this.items[this.currentFocusItemIndex].focusin();
  }

  focusout(index?: number) {
    if (index) {
      return this.items[index].focusout();
    }

    this.items.forEach(item => item.focusout());
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

  calcNextAvailableItemIndex(current: number, seed: number) {
    const max = this.items.length - 1;
    let next: number = current;
    let item: NmMenuItemComponent;

    do {
      next = next + seed;
      next = next < 0 ? max : next;
      next = next > max ? 0 : next;
      item = this.items[next];
    } while (item.disabled);

    return next;
  }

  resetCurrentFocusItemIndex() {
    this.currentFocusItemIndex > -1 && this.focusout(this.currentFocusItemIndex);
    this.currentFocusItemIndex = -1;
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

  @HostListener('focusin', ['$event'])
  onFocus(e: FocusEvent): void {
    this.currentFocusItemIndex = this.items.findIndex(item => item.contains(e.target as Node));
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
