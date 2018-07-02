import { Injectable } from '@angular/core';

import { ComponentExample } from './component-example';

@Injectable()
export class DocsSection {
  title: string;
  anchor: string;
  description?: string;
  outlet: any;
  content: ComponentExample[];
}