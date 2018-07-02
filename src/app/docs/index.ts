import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { NzAnchorModule, NzAffixModule } from 'ng-zorro-antd';

import { AppHeaderComponent } from '../common/app-header/app-header.component';
import { AppMainComponent } from '../common/app-main/app-main.component';
import { AppSidenavComponent } from '../common/app-sidenav/app-sidenav.component';
import { DocsDemoComponent } from './docs-demo/docs-demo.component';
import { CodeHighlightComponent } from './code-highlight/code-highlight.component';
import { ComponentExamplesComponent } from './component-examples/component-examples.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    NzAnchorModule,
    NzAffixModule
  ],
  declarations: [
    AppHeaderComponent,
    AppMainComponent,
    AppSidenavComponent,
    DocsDemoComponent,
    CodeHighlightComponent,
    ComponentExamplesComponent
  ],
  exports: [
    AppHeaderComponent,
    AppMainComponent,
    AppSidenavComponent,
    DocsDemoComponent,
    CodeHighlightComponent,
    ComponentExamplesComponent
  ],
  entryComponents: [
    ComponentExamplesComponent
  ],
  providers: []
})
export class DocsModule {}