import {
  Directive,
  OnInit
} from '@angular/core';

@Directive({
  selector: '[nm-loader-overlay]',
  host: {
    '[class.nm-loader-overlay]': 'true'
  }
})
export class NmLoaderOverlayDirective implements OnInit {
  ngOnInit() {
  }
}
