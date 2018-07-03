import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NmDropdownComponent } from './dropdown.component';
import { NmDropdownToggleDirective } from './dropdown-toggle.directive';
import { NmMenuDirective } from './menu.directive';
import { NmMenuItemDirective } from './menu-item.directive';
import { NmMenuDividerDirective } from './menu-divider.directive';
import { DropdownConfig } from './dropdown.config';

@NgModule({
  imports: [CommonModule],
  declarations: [
    NmDropdownComponent,
    NmDropdownToggleDirective,
    NmMenuDirective,
    NmMenuItemDirective,
    NmMenuDividerDirective
  ],
  exports: [
    NmDropdownComponent,
    NmDropdownToggleDirective,
    NmMenuDirective,
    NmMenuItemDirective,
    NmMenuDividerDirective
  ],
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
