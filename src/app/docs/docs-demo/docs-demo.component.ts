import { Component, Input, Injector, HostListener } from '@angular/core';

import { DocsSection } from '../models/docs-section';

@Component({
  selector: 'docs-demo',
  templateUrl: './docs-demo.component.html'
})
export class DocsDemoComponent {
  @Input() name: string;
  @Input() sections: DocsSection[];

  private injectors = new Map<DocsSection, Injector>();

  constructor(private injector: Injector) {}

  sectionInjections(section: DocsSection) {
    if (this.injectors.has(section)) {
      return this.injectors.get(section);
    }

    const provider = {
      provide: DocsSection,
      useValue: section
    };
    const injector = Injector.create([provider], this.injector);

    this.injectors.set(section, injector);

    return injector;
  }

  @HostListener('document:click', ['$event'])
  preventEmptyHrefNav(event: MouseEvent): void {
    let element: Element = event.target as Element;
    let isEmptyHref = element.getAttribute('href') === '#';

    if (isEmptyHref) {
      event.preventDefault();
      return;
    }

    if (element.tagName !== 'A') {
      while (element.parentElement && element !== document.body)  {
        if (isEmptyHref) {
          event.preventDefault();
          return;
        }
        element = element.parentElement;
        isEmptyHref = element.getAttribute('href') === '#';
      }
    }
  }
}
