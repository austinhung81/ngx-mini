import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { NmButtonModule } from '@ngx-mini/button';

import { routes } from './demo-button.routes';

import { DocsModule } from '../../docs';
import { DemoButtonComponent } from './demo-button.component';
import { demos } from './demo';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
    NmButtonModule.forRoot(),
    DocsModule
  ],
  declarations: [
    DemoButtonComponent,
    ...demos
  ],
  exports: [
    DemoButtonComponent
  ],
  entryComponents: [
    ...demos
  ]
})
export class DemoButtonModule {}