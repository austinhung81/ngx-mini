import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NmLoaderDirective } from './loader.directive';
import { NmLoaderOverlayDirective } from './loader-overlay.directive';
import { LoaderConfig } from './loader.config';

@NgModule({
  imports: [CommonModule],
  declarations: [NmLoaderDirective, NmLoaderOverlayDirective],
  exports: [NmLoaderDirective, NmLoaderOverlayDirective],
  entryComponents: []
})
export class NmLoaderModule {
  static forRoot(config?: LoaderConfig): ModuleWithProviders {
    return {
      ngModule: NmLoaderModule,
      providers: [{ provide: LoaderConfig, useValue: config }]
    };
  }
}
