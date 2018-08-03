import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'code-highlight',
  templateUrl: './code-highlight.component.html',
  styleUrls: ['./code-highlight.component.scss']
})
export class CodeHighlightComponent implements OnInit {
  @Input() lang = 'javascript';
  @Input() code;

  ngOnInit() {
  }

}