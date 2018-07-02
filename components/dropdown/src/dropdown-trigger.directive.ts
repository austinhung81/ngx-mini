import {
  Directive,
  Input,
  OnInit,
  OnChanges,
  Self,
  HostListener
} from '@angular/core';
import { NgClass } from '@angular/common';
import { Subject } from 'rxjs';

@Directive({
  selector: '[nm-dropdonw-trigger]',
  providers: [NgClass]
})
export class NmDropdownTriggerDirective implements OnInit, OnChanges {
  $mouseenter = new Subject<MouseEvent>();
  $mouseleave = new Subject<MouseEvent>();
  $click = new Subject<MouseEvent>();

  private classes: { [name: string]: boolean } = {};

  constructor(@Self() private ngClass: NgClass) {
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
    this.$mouseenter.next(e);
  }

  @HostListener('mouseleave', ['$event'])
  onMouseLeave(e: MouseEvent): void {
    this.$mouseleave.next(e);
  }

  @HostListener('click', ['$event'])
  onClick(e: MouseEvent): void {
    this.$click.next(e);
  }

  private setCurrentClasses(): void {
    this.classes = {
      'nm-dropdonw-trigger': true
    };
  }

  private applyCurrentClasses(): void {
    this.ngClass.ngClass = this.classes;
    this.ngClass.ngDoCheck();
  }
}
