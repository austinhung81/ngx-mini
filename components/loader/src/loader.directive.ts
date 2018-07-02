import {
  Directive,
  Input,
  OnInit,
  OnChanges,
  ElementRef,
  Renderer2
} from '@angular/core';

import { LoaderConfig } from './loader.config';

@Directive({
  selector: '[nm-loader]'
})
export class NmLoaderDirective implements OnInit, OnChanges {
  /** Loader size.
   * Provides one of supported sizes: `sm`, `md`, `lg`
   */
  @Input() size = 'md';

  /** Whether loader is spinning */
  @Input() spinning = true;

  private classes: { [name: string]: boolean } = {};

  constructor(private elem: ElementRef, private renderer: Renderer2, config: LoaderConfig) {
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
      'nm-loader': true,
      'nm-loader-lg': this.size === 'lg',
      'nm-loader-md': this.size === 'md',
      'nm-loader-sm': this.size === 'sm',
      'nm-loader-spinning': this.spinning,
      'nm-loader-stop': !this.spinning
    };
  }

  private applyCurrentClasses(): void {
    for (let [name, value] of Object.entries(this.classes)) {
      value && this.renderer.addClass(this.elem.nativeElement, name);
      !value && this.renderer.removeClass(this.elem.nativeElement, name);
    }
  }
}
