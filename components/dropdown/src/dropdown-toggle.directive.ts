import {
  Directive,
  OnInit,
  OnChanges,
  HostListener,
  ElementRef,
  Renderer2
} from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Directive({
  selector: '[nm-dropdown-toggle]'
})
export class NmDropdownToggleDirective implements OnInit, OnChanges {
  private mouseenter = new Subject<MouseEvent>();
  private mouseleave = new Subject<MouseEvent>();
  private click = new Subject<MouseEvent>();
  private escape = new Subject<KeyboardEvent>();
  private arrowup = new Subject<KeyboardEvent>();
  private arrowdown = new Subject<KeyboardEvent>();

  mouseenter$: Observable<MouseEvent> = this.mouseenter.asObservable();
  mouseleave$: Observable<MouseEvent> = this.mouseleave.asObservable();
  click$: Observable<MouseEvent> = this.click.asObservable();
  escape$: Observable<KeyboardEvent> = this.escape.asObservable();
  arrowup$: Observable<KeyboardEvent> = this.arrowup.asObservable();
  arrowdown$: Observable<KeyboardEvent> = this.arrowdown.asObservable();

  private classes: { [name: string]: boolean } = {};

  constructor(private elem: ElementRef, private renderer: Renderer2) {
  }

  disable(disabled: boolean) {
    if (disabled) {
      this.renderer.setAttribute(this.elem.nativeElement, 'disabled', 'disabled');
    } else {
      this.renderer.removeAttribute(this.elem.nativeElement, 'disabled');
    }
  }

  ngOnInit() {
    this.setCurrentClasses();
    this.applyCurrentClasses();
  }

  ngOnChanges(): void {
    this.setCurrentClasses();
    this.applyCurrentClasses();
  }

  @HostListener('mouseenter', ['$event'])
  onMouseEnter(e: MouseEvent): void {
    this.mouseenter.next(e);
  }

  @HostListener('mouseleave', ['$event'])
  onMouseLeave(e: MouseEvent): void {
    this.mouseleave.next(e);
  }

  @HostListener('click', ['$event'])
  onClick(e: MouseEvent): void {
    this.click.next(e);
  }

  @HostListener('keyup.esc', ['$event'])
  onKeyupEsc(e: KeyboardEvent): void {
    this.escape.next(e);
  }

  @HostListener('keydown.arrowup', ['$event'])
  onKeydownArrowUp(e: KeyboardEvent): void {
    this.arrowup.next(e);
  }

  @HostListener('keydown.arrowdown', ['$event'])
  onKeydownArrowDown(e: KeyboardEvent): void {
    this.arrowdown.next(e);
  }

  private setCurrentClasses(): void {
    this.classes = {
      'nm-dropdown-toggle': true
    };
  }

  private applyCurrentClasses(): void {
    for (let [name, value] of Object.entries(this.classes)) {
      value && this.renderer.addClass(this.elem.nativeElement, name);
      !value && this.renderer.removeClass(this.elem.nativeElement, name);
    }
  }
}
