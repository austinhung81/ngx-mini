import { Component, ChangeDetectionStrategy } from '@angular/core';

import { DocsSection } from '../models/docs-section';
import { ComponentExample } from '../models/component-example';

@Component({
  selector: 'app-component-examples',
  templateUrl: './component-examples.component.html',
  styleUrls: ['./component-examples.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ComponentExamplesComponent {
  public examples: ComponentExample[];

  constructor(public section: DocsSection) {
    this.examples = section.content as ComponentExample[];
  }
}