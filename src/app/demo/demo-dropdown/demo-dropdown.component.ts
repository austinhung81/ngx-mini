import { Component, ChangeDetectionStrategy } from '@angular/core';

import { DocsSection } from '../../docs/models/docs-section';
import { HtmlParser } from '../../docs/models/html-parser';
import { ComponentExamplesComponent } from '../../docs/component-examples/component-examples.component';

import { DemoDropdownBasicComponent } from './demo/basic/basic.component';
import { DemoDropdownTriggerComponent } from './demo/trigger/trigger.component';

import demoBasicHtml from './demo/basic/basic.component.html';
import demoTriggerHtml from './demo/trigger/trigger.component.html';

@Component({
  selector: 'demo-dropdown',
  templateUrl: './demo-dropdown.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DemoDropdownComponent {
  public name = 'Dropdown';
  public sections: DocsSection[] = [
    {
      title: 'Examples',
      anchor: 'examples',
      outlet: ComponentExamplesComponent,
      content: [
        {
          title: 'Basic',
          anchor: 'basic',
          outlet: DemoDropdownBasicComponent,
          source: {
            html: new HtmlParser(demoBasicHtml).extract('[example]', false)
          }
        },
        {
          title: 'Trigger',
          anchor: 'trigger',
          outlet: DemoDropdownTriggerComponent,
          source: {
            html: new HtmlParser(demoTriggerHtml).extract('[example]', false)
          }
        }
      ]
    }
  ];
}