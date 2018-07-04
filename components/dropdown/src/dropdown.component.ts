import {
  Component,
  Input,
  Output,
  OnInit,
  OnDestroy,
  OnChanges,
  AfterContentInit,
  ElementRef,
  Renderer2,
  EventEmitter,
  ContentChild,
  HostListener
} from '@angular/core';

import { Observable, Subject, merge } from 'rxjs';
import { map, mapTo, takeUntil, debounceTime, filter, tap } from 'rxjs/operators';

import { DropdownConfig } from './dropdown.config';
import { NmDropdownToggleDirective } from './dropdown-toggle.directive';
import { NmMenuDirective } from './menu.directive';

@Component({
  selector: 'nm-dropdown',
  templateUrl: './dropdown.component.html'
})
export class NmDropdownComponent implements OnInit, OnDestroy, OnChanges, AfterContentInit {
  /** specifies event that should trigger */
  @Input() trigger = 'click';

  /** placement of pop menu
   * Provides one of supported placements: `bottom-left`, `bottom-right`
   */
  @Input() placement = 'bottom-left';

  /** whether the dropdown menu is disabled */
  @Input() disabled = false;

  /** whether the dropdown menu is currently being shown */
  @Input() open = false;

  /** whether the dropdown menu will be closed after pressing ESC */
  @Input() closeOnEsc = true;

  /** whether the dropdown menu will be closed on item or document click */
  @Input() closeOnClick = true;

  /** Emits an event when open change */
  @Output() openChange = new EventEmitter<boolean>();

  @ContentChild(NmDropdownToggleDirective) toggle: NmDropdownToggleDirective;
  @ContentChild(NmMenuDirective) menu: NmMenuDirective;

  private classes: { [name: string]: boolean } = {};
  private open$ = new Subject<boolean>();
  private unsubscribe$ = new Subject<void>();

  constructor(private elem: ElementRef, private renderer: Renderer2, config: DropdownConfig) {
    Object.assign(this, config);
  }

  show() {
    this.open$.next(true);
  }

  hide() {
    this.open$.next(false);
  }

  listenArrowKeydown() {
    const preventDefault = e => e.preventDefault();
    const arrows$: Observable<number> = merge(
      this.toggle.arrowup$.pipe(tap(preventDefault), mapTo(-1)),
      this.toggle.arrowdown$.pipe(tap(preventDefault), mapTo(1)),
      this.menu.arrowup$.pipe(tap(preventDefault), mapTo(-1)),
      this.menu.arrowdown$.pipe(tap(preventDefault), mapTo(1))
    );

    arrows$.pipe(takeUntil(this.unsubscribe$)).subscribe(this.onArrowsKeyup);
  }

  listenOpenChange() {
    let toggle$: Observable<boolean>;
    let menu$: Observable<boolean>;

    if (this.trigger === 'click') {
      toggle$ = merge(
        this.toggle.click$.pipe(map(_ => !this.open)),
        this.toggle.escape$.pipe(mapTo(false))
      );

      menu$ = this.menu.click$.pipe(map(_ => !this.closeOnClick));
    }

    if (this.trigger === 'hover') {
      toggle$ = merge(
        this.toggle.click$.pipe(map(_ => !this.open)),
        this.toggle.mouseenter$.pipe(mapTo(true)),
        this.toggle.mouseleave$.pipe(mapTo(false))
      );

      menu$ = merge(
        this.menu.mouseenter$.pipe(mapTo(true)),
        this.menu.mouseleave$.pipe(mapTo(false)),
        this.menu.click$.pipe(map(_ => !this.closeOnClick))
      );
    }

    merge(toggle$, menu$).pipe(debounceTime(100), takeUntil(this.unsubscribe$)).subscribe(this.onOpenChange);
  }

  listenOpen() {
    this.openChange.pipe(filter(v => v)).subscribe(this.onOpen);
  }

  onArrowsKeyup = (seed: number) => {
    this.menu.activateItem(seed);
  }

  onOpenChange = (open: boolean) => {
    this.open = open;
    this.openChange.emit(open);
    this.setCurrentClasses();
    this.applyCurrentClasses();
  }

  onOpen = () => {
    this.menu.resetCurrentActiveItemIndex();
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(e: MouseEvent): void {
    if (!this.elem.nativeElement.contains(e.target) && this.closeOnClick) {
      this.onOpenChange(false);
    }
  }

  ngOnInit() {
    this.setCurrentClasses();
    this.applyCurrentClasses();
    this.applyToggleDisabledAttr();
  }

  ngOnChanges(): void {
    this.setCurrentClasses();
    this.applyCurrentClasses();
    this.applyToggleDisabledAttr();
  }

  ngAfterContentInit(): void {
    this.listenOpenChange();
    this.listenOpen();
    this.listenArrowKeydown();
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  private applyToggleDisabledAttr() {
    this.toggle.disable(this.disabled);
  }

  private setCurrentClasses(): void {
    this.classes = {
      'nm-dropdown': true,
      'nm-dropdown-open': this.open,
      'nm-dropdown-disabled': this.disabled
    };
  }

  private applyCurrentClasses(): void {
    for (let [name, value] of Object.entries(this.classes)) {
      value && this.renderer.addClass(this.elem.nativeElement, name);
      !value && this.renderer.removeClass(this.elem.nativeElement, name);
    }
  }
}
