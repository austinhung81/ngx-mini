import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NmDropdownComponent } from './dropdown.component';
import { NmDropdownToggleDirective } from './dropdown-toggle.directive';
import { NmDropdownMenuDirective } from './dropdown-menu.directive';
import { DropdownConfig } from './dropdown.config';

@NgModule({
  imports: [CommonModule],
  declarations: [NmDropdownComponent, NmDropdownToggleDirective, NmDropdownMenuDirective],
  exports: [NmDropdownComponent, NmDropdownToggleDirective, NmDropdownMenuDirective],
  entryComponents: []
})
export class NmDropdownModule {
  static forRoot(config?: DropdownConfig): ModuleWithProviders {
    return {
      ngModule: NmDropdownModule,
      providers: [{ provide: DropdownConfig, useValue: config }]
    };
  }
}
