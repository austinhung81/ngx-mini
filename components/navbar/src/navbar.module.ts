import { CommonModule } from '@angular/common';
import { NgModule, ModuleWithProviders } from '@angular/core';
import { OverlayModule } from '@angular/cdk/overlay';

import { NmMenuModule } from '@ngx-mini/menu';

import { NmNavbarComponent } from './navbar.component';
import { NavbarConfig } from './navbar.config';
import { NmNavbarItemComponent } from './navbar-item.component';

@NgModule({
  imports: [
    CommonModule,
    OverlayModule,
    NmMenuModule.forRoot()
  ],
  declarations: [
    NmNavbarComponent,
    NmNavbarItemComponent
  ],
  exports: [
    NmNavbarComponent,
    NmNavbarItemComponent
  ],
  entryComponents: []
})
export class NmNavbarModule {
  static forRoot(): ModuleWithProviders {
    return { ngModule: NmNavbarModule, providers: [NavbarConfig] };
  }
}
