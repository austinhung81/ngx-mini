import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: '[mini-navbar-item]',
  templateUrl: './navbar-item.component.html'
})
export class MiniNavbarItemComponent implements OnInit {
  @Input() disabled: boolean = false;

  constructor() { }

  ngOnInit() {
  }

}