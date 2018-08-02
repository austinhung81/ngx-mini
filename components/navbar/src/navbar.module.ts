import { CommonModule } from '@angular/common';
import { NgModule, ModuleWithProviders } from '@angular/core';
import { OverlayModule } from '@angular/cdk/overlay';

import { NmMenuModule } from '@ngx-mini/menu';

import { NmNavbarComponent } from './navbar.component';
import { NavbarConfig } from './navbar.config';
import { NmNavbarItemComponent } from './navbar-item.component';
import { NmNavbarBrandComponent } from './navbar-brand.component';

@NgModule({
  imports: [
    CommonModule,
    OverlayModule,
    NmMenuModule.forRoot()
  ],
  declarations: [
    NmNavbarComponent,
    NmNavbarItemComponent,
    NmNavbarBrandComponent
  ],
  exports: [
    NmNavbarComponent,
    NmNavbarItemComponent,
    NmNavbarBrandComponent
  ],
  entryComponents: []
})
export class NmNavbarModule {
  static forRoot(): ModuleWithProviders {
    return { ngModule: NmNavbarModule, providers: [NavbarConfig] };
  }
}
