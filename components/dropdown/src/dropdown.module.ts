import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NmDropdownComponent } from './dropdown.component';
import { NmDropdownToggleDirective } from './dropdown-toggle.directive';
import { NmMenuDirective } from './menu.directive';
import { NmMenuItemComponent } from './menu-item.component';
import { NmMenuDividerDirective } from './menu-divider.directive';
import { DropdownConfig } from './dropdown.config';

@NgModule({
  imports: [CommonModule],
  declarations: [
    NmDropdownComponent,
    NmDropdownToggleDirective,
    NmMenuDirective,
    NmMenuItemComponent,
    NmMenuDividerDirective
  ],
  exports: [
    NmDropdownComponent,
    NmDropdownToggleDirective,
    NmMenuDirective,
    NmMenuItemComponent,
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
