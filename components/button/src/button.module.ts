import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NmButtonComponent } from './button.component';
import { ButtonConfig } from './button.config';

@NgModule({
  imports: [CommonModule],
  declarations: [NmButtonComponent],
  exports: [NmButtonComponent],
  entryComponents: []
})
export class NmButtonModule {
  static forRoot(config?: ButtonConfig): ModuleWithProviders {
    return {
      ngModule: NmButtonModule,
      providers: [{ provide: ButtonConfig, useValue: config }]
    };
  }
}
