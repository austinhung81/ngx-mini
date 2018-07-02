import { Component, ChangeDetectionStrategy } from '@angular/core';

import { DocsSection } from '../../docs/models/docs-section';
import { ComponentExamplesComponent } from '../../docs/component-examples/component-examples.component';

import { DemoNavbarHorizontalComponent } from './demo/horizontal/horizontal.component';

@Component({
  selector: 'demo-navbar',
  templateUrl: './demo-navbar.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DemoNavbarComponent {
  public name = 'Navigation Bar';
  public sections: DocsSection[] = [
    {
      title: 'Examples',
      anchor: 'examples',
      outlet: ComponentExamplesComponent,
      content: [
        {
          title: 'Horizontal Navigation Bar',
          anchor: 'horizontal',
          outlet: DemoNavbarHorizontalComponent
        }
      ]
    }
  ];
}