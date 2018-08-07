import { Component, ChangeDetectionStrategy } from '@angular/core';

import { DocsSection } from '../../docs/models/docs-section';
import { HtmlParser } from '../../docs/models/html-parser';
import { ComponentExamplesComponent } from '../../docs/component-examples/component-examples.component';

import { DemoNavbarHorizontalComponent } from './demo/horizontal/horizontal.component';

import demoHorizontalHtml from './demo/horizontal/horizontal.component.html';

@Component({
  selector: 'demo-navbar',
  templateUrl: './demo-navbar.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DemoNavbarComponent {
  public name = 'Navbar';
  public sections: DocsSection[] = [
    {
      title: 'Examples',
      anchor: 'examples',
      outlet: ComponentExamplesComponent,
      content: [
        {
          title: 'Horizontal',
          anchor: 'horizontal',
          outlet: DemoNavbarHorizontalComponent,
          source: {
            html: new HtmlParser(demoHorizontalHtml).extract('[example]', false)
          }
        }
      ]
    }
  ];
}