import { Component, ChangeDetectionStrategy } from '@angular/core';

import { DocsSection } from '../../docs/models/docs-section';
import { HtmlParser } from '../../docs/models/html-parser';
import { ComponentExamplesComponent } from '../../docs/component-examples/component-examples.component';

import { DemoLoaderSizeComponent } from './demo/size/size.component';
import { DemoLoaderInsideButtonComponent } from './demo/inside-button/inside-button.component';
import { DemoLoaderSpinningComponent } from './demo/spinning/spinning.component';
import { DemoLoaderOverlayComponent } from './demo/overlay/overlay.component';

import demoSizeHtml from './demo/size/size.component.html';
import demoInsideButtonHtml from './demo/inside-button/inside-button.component.html';
import demoSpinningHtml from './demo/spinning/spinning.component.html';
import demoOverlayHtml from './demo/overlay/overlay.component.html';

@Component({
  selector: 'demo-loader',
  templateUrl: './demo-loader.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DemoLoaderComponent {
  public name = 'Loader';
  public sections: DocsSection[] = [
    {
      title: 'Examples',
      anchor: 'examples',
      outlet: ComponentExamplesComponent,
      content: [
        {
          title: 'Size',
          anchor: 'size',
          outlet: DemoLoaderSizeComponent,
          source: {
            html: new HtmlParser(demoSizeHtml).extract('[example]', false)
          }
        },
        {
          title: 'Inside Button',
          anchor: 'inside-button',
          outlet: DemoLoaderInsideButtonComponent,
          source: {
            html: new HtmlParser(demoInsideButtonHtml).extract('[example]', false)
          }
        },
        {
          title: 'Toggle Spinning',
          anchor: 'spinning',
          outlet: DemoLoaderSpinningComponent,
          source: {
            html: new HtmlParser(demoSpinningHtml).extract('[example]', true)
          }
        },
        {
          title: 'Overlay',
          anchor: 'overlay',
          outlet: DemoLoaderOverlayComponent,
          source: {
            html: new HtmlParser(demoOverlayHtml).extract('[example]', true)
          }
        }
      ]
    }
  ];
}