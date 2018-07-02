import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { NmButtonModule } from '@ngx-mini/button';
import { NmDropdownModule } from '@ngx-mini/dropdown';

import { routes } from './demo-dropdown.routes';

import { DocsModule } from '../../docs';
import { DemoDropdownComponent } from './demo-dropdown.component';
import { demos } from './demo';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
    NmButtonModule.forRoot(),
    NmDropdownModule.forRoot(),
    DocsModule
  ],
  declarations: [
    DemoDropdownComponent,
    ...demos
  ],
  exports: [
    DemoDropdownComponent
  ],
  entryComponents: [
    ...demos
  ]
})
export class DemoDropdownModule {}