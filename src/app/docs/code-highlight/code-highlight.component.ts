import { Component, OnInit, Input } from '@angular/core';
import * as Prism from 'prismjs';

@Component({
  selector: 'code-highlight',
  templateUrl: './code-highlight.component.html',
  styleUrls: ['./code-highlight.component.scss']
})
export class CodeHighlightComponent implements OnInit {
  @Input() lang = 'javascript';

  private _code: string;

  @Input()
  set code(value: string) {
    this._code = Prism.highlight(value, Prism.languages[this.lang]);
  }

  get code() {
    return this._code;
  }

  ngOnInit() {
  }

}