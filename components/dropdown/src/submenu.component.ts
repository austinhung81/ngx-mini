import {
  Component,Input, Output, ViewChild, ContentChild,
  EventEmitter, AfterContentInit, OnDestroy
} from '@angular/core';

import { Observable, Subject, merge } from 'rxjs';
import { mapTo, takeUntil, debounceTime } from 'rxjs/operators';

import { NmDropdownToggleDirective } from './dropdown-toggle.directive';
import { NmMenuDirective, NmMenuItemComponent } from '@ngx-mini/menu';

@Component({
  selector: '[nm-submenu]',
  templateUrl: './submenu.component.html'
})
export class NmSubmenuComponent extends NmMenuItemComponent implements AfterContentInit, OnDestroy {
  /** whether the submenu is currently being shown */
  @Input() open = false;

  /** Emits an event when open change */
  @Output() openChange = new EventEmitter<boolean>();

  @ViewChild(NmDropdownToggleDirective) toggle: NmDropdownToggleDirective;
  @ContentChild(NmMenuDirective) menu: NmMenuDirective;

  protected unsubscribe$ = new Subject<void>();

  listenOpenChange() {
    let toggle$: Observable<boolean>;
    let menu$: Observable<boolean>;

    toggle$ = merge(
      this.toggle.mouseenter$.pipe(mapTo(true)),
      this.toggle.mouseleave$.pipe(mapTo(false))
    );

    menu$ = merge(
      this.menu.mouseenter$.pipe(mapTo(true)),
      this.menu.mouseleave$.pipe(mapTo(false)),
      this.menu.click$.pipe(mapTo(false)),
    );

    merge(toggle$, menu$).pipe(debounceTime(100), takeUntil(this.unsubscribe$)).subscribe(this.onOpenChange);
  }

  onOpenChange = (open: boolean) => {
    this.open = open;
    this.openChange.emit(open);
    this.setCurrentClasses();
    this.applyCurrentClasses();
  }

  ngOnInit() {
    super.ngOnInit();
    this.applyToggleDisabledAttr();
  }

  ngOnChanges() {
    super.ngOnChanges();
    this.applyToggleDisabledAttr();
  }

  ngAfterContentInit(): void {
    this.listenOpenChange();
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  protected applyToggleDisabledAttr() {
    this.toggle.disable(this.disabled);
  }

  protected setCurrentClasses(): void {
    this.classes = {
      'nm-menu-item': true,
      'nm-submenu': true,
      'nm-submenu-open': this.open,
      'active': this.active,
      'focus': this.focus,
      'disabled': this.disabled
    };
  }
}