import { Injectable } from '@angular/core';

import { ComponentSource } from './component-source';

@Injectable()
export class ComponentExample {
  title: string;
  anchor: string;
  description?: string;
  outlet: any;
  source?: ComponentSource;
}