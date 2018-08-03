import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NmMenuModule } from '@ngx-mini/menu';

import { NmDropdownComponent } from './dropdown.component';
import { NmDropdownToggleDirective } from './dropdown-toggle.directive';
import { NmSubmenuComponent } from './submenu.component';
import { DropdownConfig } from './dropdown.config';

@NgModule({
  imports: [
    CommonModule,
    NmMenuModule.forRoot()
  ],
  declarations: [
    NmDropdownComponent,
    NmDropdownToggleDirective,
    NmSubmenuComponent
  ],
  exports: [
    NmDropdownComponent,
    NmDropdownToggleDirective,
    NmSubmenuComponent
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
