import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  template: `
        <h1 class="header">Header</h1>
  `,
  styleUrls: []
})
export class HeaderComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
