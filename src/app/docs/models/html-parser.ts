import { Inject, Injectable } from '@angular/core';
import { DOCUMENT } from '@angular/common';

@Injectable()
export class HtmlParser {
  private node: HTMLElement;

  constructor(private content: string) {
    this.node = document.createElement('div');
    this.node.innerHTML = content;
  }

  static trim(html: string):string {
    return html.trim().replace(/^\s\s/gm, '').replace(/\s*$/gm, '').replace(/=""/g, '');
  }

  extract(select: string, self: boolean): string {
    const target = this.node.querySelector(select);
    if (!target) {
      return ''; 
    }
    if (self) {
      /^\./.test(select) && target.classList.remove(select.slice(1));
      /^\[[\w-]+\]$/.test(select) && target.removeAttribute(select.slice(1, -1));
      return HtmlParser.trim(target.outerHTML);
    }
    return HtmlParser.trim(target.innerHTML);
  }
}