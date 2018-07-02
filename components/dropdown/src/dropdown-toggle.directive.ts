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

  private classes: { [name: string]: boolean } = {};

  mouseenter$: Observable<MouseEvent> = this.mouseenter.asObservable();
  mouseleave$: Observable<MouseEvent> = this.mouseleave.asObservable();
  click$: Observable<MouseEvent> = this.click.asObservable();

  constructor(private elem: ElementRef, private renderer: Renderer2) {
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

  private setCurrentClasses(): void {
    this.classes = {
      'nm-dropdonw-toggle': true
    };
  }

  private applyCurrentClasses(): void {
    for (let [name, value] of Object.entries(this.classes)) {
      value && this.renderer.addClass(this.elem.nativeElement, name);
      !value && this.renderer.removeClass(this.elem.nativeElement, name);
    }
  }
}
