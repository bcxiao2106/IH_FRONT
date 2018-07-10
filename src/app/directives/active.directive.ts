import { Directive, Renderer2, ElementRef, OnInit, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[appActive]'
})
export class ActiveDirective implements OnInit {

  constructor( private el: ElementRef, private renderer: Renderer2 ) { }

  @Input('activeBgColor') activeBgColor: string;
  @Input('activeColor') activeColor: string;

  ngOnInit() {
  }

  @HostListener('mouseenter') onMouseEnter() {
    this.active(this.activeBgColor, this.activeColor);
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.active(null, null);
  }

  private active(bgColor: string, color: string) {
    this.el.nativeElement.style.backgroundColor = bgColor;
    this.el.nativeElement.style.color = color;
  }
}
