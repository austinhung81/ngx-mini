import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NmMenuDirective } from './menu.directive';
import { NmMenuItemComponent } from './menu-item.component';
import { NmMenuDividerDirective } from './menu-divider.directive';
import { MenuConfig } from './menu.config';

@NgModule({
  imports: [CommonModule],
  declarations: [
    NmMenuDirective,
    NmMenuItemComponent,
    NmMenuDividerDirective
  ],
  exports: [
    NmMenuDirective,
    NmMenuItemComponent,
    NmMenuDividerDirective
  ],
  entryComponents: []
})
export class NmMenuModule {
  static forRoot(config?: MenuConfig): ModuleWithProviders {
    return {
      ngModule: NmMenuModule,
      providers: [{ provide: MenuConfig, useValue: config }]
    };
  }
}
