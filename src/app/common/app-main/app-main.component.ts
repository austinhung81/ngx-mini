import { Component, OnInit, AfterViewInit, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-main',
  templateUrl: './app-main.component.html'
})
export class AppMainComponent implements OnInit, AfterViewInit {
  private fragment: string;

  constructor(@Inject(DOCUMENT) private document: Document, private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.route.fragment.subscribe(fragment => { this.fragment = fragment; });
  }

  ngAfterViewInit(): void {
    const target: HTMLElement = this.document.getElementById(this.fragment);

    if (!target) { return; }

    const header: HTMLElement = this.document.querySelector('app-root > app-header > header');
    const targetPosY: number = target.offsetTop - header.offsetHeight - 8;

    document.querySelector(`#${this.fragment}`).scrollIntoView();
    window.scrollTo(0, targetPosY);
  }
}
