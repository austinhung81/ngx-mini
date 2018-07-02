import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { NmButtonModule } from '@ngx-mini/button';

import { environment } from '../environments/environment';

import { routes } from './app.routes';

import { DocsModule } from './docs';
import { AppComponent } from './app.component';
import { AppHeaderComponent } from './common/app-header/app-header.component';
import { AppFooterComponent } from './common/app-footer/app-footer.component';
import { LandingComponent } from './common/landing/landing.component';
import { GettingStartedComponent } from './common/getting-started/getting-started.component';
import { PageNotFoundComponent } from './common/page-not-found/page-not-found.component';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot(routes, { useHash: environment.useHash }),
    DocsModule,
    NmButtonModule.forRoot()
  ],
  declarations: [
    AppComponent,
    LandingComponent,
    GettingStartedComponent,
    PageNotFoundComponent,
    AppFooterComponent
  ],
  entryComponents: [
    AppHeaderComponent
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
