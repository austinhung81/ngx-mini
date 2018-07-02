import { Component, ChangeDetectionStrategy } from '@angular/core';

import { DocsSection } from '../../docs/models/docs-section';
import { HtmlParser } from '../../docs/models/html-parser';
import { ComponentExamplesComponent } from '../../docs/component-examples/component-examples.component';

import { DemoButtonTypeComponent } from './demo/type/type.component';
import { DemoButtonSizeComponent } from './demo/size/size.component';

import demoTypeHtml from './demo/type/type.component.html';
import demoSizeHtml from './demo/size/size.component.html';

@Component({
  selector: 'demo-button',
  templateUrl: './demo-button.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DemoButtonComponent {
  public name = 'Button';
  public sections: DocsSection[] = [
    {
      title: 'Examples',
      anchor: 'examples',
      outlet: ComponentExamplesComponent,
      content: [
        {
          title: 'Button Type',
          anchor: 'size',
          outlet: DemoButtonTypeComponent,
          source: {
            html: new HtmlParser(demoTypeHtml).extract('[example]', false)
          }
        },
        {
          title: 'Button Size',
          anchor: 'size',
          outlet: DemoButtonSizeComponent,
          source: {
            html: new HtmlParser(demoSizeHtml).extract('[example]', false)
          }
        },
      ]
    }
  ];
}