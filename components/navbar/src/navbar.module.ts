import { CommonModule } from '@angular/common';
import { NgModule, ModuleWithProviders } from '@angular/core';
import { OverlayModule } from '@angular/cdk/overlay';

import { NmMenuModule } from '@ngx-mini/menu';

import { MiniNavbarComponent } from './navbar.component';
import { NavbarConfig } from './navbar.config';
import { MiniNavbarItemComponent } from './navbar-item.component';
import { MiniNavbarBrandComponent } from './navbar-brand.component';

@NgModule({
  imports: [
    CommonModule,
    OverlayModule,
    NmMenuModule.forRoot()
  ],
  declarations: [
    MiniNavbarComponent,
    MiniNavbarItemComponent,
    MiniNavbarBrandComponent
  ],
  exports: [
    MiniNavbarComponent,
    MiniNavbarItemComponent,
    MiniNavbarBrandComponent
  ],
  entryComponents: [
    MiniNavbarComponent,
    MiniNavbarItemComponent
  ]
})
export class MiniNavbarModule {
  static forRoot(): ModuleWithProviders {
    return { ngModule: MiniNavbarModule, providers: [NavbarConfig] };
  }
}
