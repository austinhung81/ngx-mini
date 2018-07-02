import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { NzAffixModule } from 'ng-zorro-antd';

import { MiniNavbarModule } from '@ngx-mini/navbar';

import { routes } from './demo-navbar.routes';

import { DocsModule } from '../../docs';
import { DemoNavbarComponent } from './demo-navbar.component';
import { demos } from './demo';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
    MiniNavbarModule.forRoot(),
    DocsModule,
    NzAffixModule
  ],
  declarations: [
    DemoNavbarComponent,
    ...demos
  ],
  exports: [
    DemoNavbarComponent
  ],
  entryComponents: [
    ...demos
  ]
})
export class DemoNavbarModule {}