import { Component, OnInit, ElementRef } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  activeBgColor = '#806B75';
  activeColor = 'white';
  constructor() { }

  ngOnInit() {
  }
}
