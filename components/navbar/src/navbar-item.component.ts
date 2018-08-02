import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: '[mini-navbar-item]',
  templateUrl: './navbar-item.component.html'
})
export class NmNavbarItemComponent implements OnInit {
  @Input() disabled: boolean = false;

  constructor() { }

  ngOnInit() {
  }

}