import { Directive } from '@angular/core';

@Directive({
  selector: '[nm-menu-divider]',
  host: {
    '[class.nm-menu-divider]': 'true'
  }
})
export class NmMenuDividerDirective {
}
