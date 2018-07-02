import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { NzSwitchModule } from 'ng-zorro-antd';
import { NmButtonModule } from '@ngx-mini/button';
import { NmLoaderModule } from '@ngx-mini/loader';

import { routes } from './demo-loader.routes';

import { DocsModule } from '../../docs';
import { DemoLoaderComponent } from './demo-loader.component';
import { demos } from './demo';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
    NmButtonModule.forRoot(),
    NmLoaderModule.forRoot(),
    DocsModule,
    NzSwitchModule
  ],
  declarations: [
    DemoLoaderComponent,
    ...demos
  ],
  exports: [
    DemoLoaderComponent
  ],
  entryComponents: [
    ...demos
  ]
})
export class DemoLoaderModule {}