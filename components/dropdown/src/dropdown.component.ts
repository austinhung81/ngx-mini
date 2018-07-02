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
  ContentChild
} from '@angular/core';

import { Observable, Subject, merge } from 'rxjs';
import { mapTo, takeUntil, debounceTime } from 'rxjs/operators';

import { DropdownConfig } from './dropdown.config';
import { NmDropdownToggleDirective } from './dropdown-toggle.directive';

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
  @Output() isOpenChange = new EventEmitter<boolean>();

  @ContentChild(NmDropdownToggleDirective) toggle: NmDropdownToggleDirective;

  private classes: { [name: string]: boolean } = {};
  private unsubscribe$ = new Subject<void>();

  constructor(private elem: ElementRef, private renderer: Renderer2, config: DropdownConfig) {
    Object.assign(this, config);
  }

  ngOnInit() {
    this.setCurrentClasses();
    this.applyCurrentClasses();
  }

  ngOnChanges(): void {
    this.setCurrentClasses();
    this.applyCurrentClasses();
  }

  ngAfterContentInit(): void {
    let mouse$: Observable<boolean>;

    if (this.trigger === 'click') {
      mouse$ = this.toggle.click$.pipe(mapTo(true));
    }

    if (this.trigger === 'hover') {
      mouse$ = merge(
        this.toggle.mouseenter$.pipe(mapTo(true)),
        this.toggle.mouseleave$.pipe(mapTo(false), debounceTime(100))
      );
    }

    mouse$.pipe(takeUntil(this.unsubscribe$)).subscribe(this.onOpenChange);
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  onOpenChange = (open: boolean) => {
    this.open = open;
    this.isOpenChange.emit(open);
    this.setCurrentClasses();
    this.applyCurrentClasses();
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
