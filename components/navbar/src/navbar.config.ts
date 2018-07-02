import { Injectable } from '@angular/core';

export type Mode = 'horizontal' | 'vertical';

@Injectable()
export class NavbarConfig {
  /** default navigation mode */
  mode = 'horizontal';
}
