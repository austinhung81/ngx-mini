import {
  Component,
  Input,
  OnInit,
  OnChanges,
  ElementRef,
  Renderer2
} from '@angular/core';

import { ButtonConfig } from './button.config';

@Component({
  selector: '[nm-btn]',
  templateUrl: './button.component.html'
})
export class NmButtonComponent implements OnInit, OnChanges {
  /** Button size.
   * Provides one of supported sizes: `sm`, `md`, `lg`
   */
  @Input() size = 'md';

  /** Button type.
   * Provides one of supported types: `default`, `primary`, `secondary`, `emphasis`, `link`
   */
  @Input() surface = 'default';

  private classes: { [name: string]: boolean } = {};

  constructor(private elem: ElementRef, private renderer: Renderer2, config: ButtonConfig) {
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

  private setCurrentClasses(): void {
    this.classes = {
      'nm-btn': true,
      'nm-btn-default': this.surface === 'default',
      'nm-btn-primary': this.surface === 'primary',
      'nm-btn-secondary': this.surface === 'secondary',
      'nm-btn-emphasis': this.surface === 'emphasis',
      'nm-btn-link': this.surface === 'link',
      'nm-btn-lg': this.size === 'lg',
      'nm-btn-md': this.size === 'md',
      'nm-btn-sm': this.size === 'sm',
      'nm-btn-xs': this.size === 'xs'
    };
  }

  private applyCurrentClasses(): void {
    for (let [name, value] of Object.entries(this.classes)) {
      value && this.renderer.addClass(this.elem.nativeElement, name);
      !value && this.renderer.removeClass(this.elem.nativeElement, name);
    }
  }
}
