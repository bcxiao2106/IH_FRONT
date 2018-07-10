import { Directive, Renderer2, ElementRef, OnInit, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[appSelected]'
})
export class SelectedDirective implements OnInit {
  @Input('selectedBgColor') selectedBgColor: string;
  @Input('selectedColor') selectedColor: string;
  @Input('isBold') isBold: Boolean;
  isSelected: Boolean = false;

  constructor(private el: ElementRef, private renderer: Renderer2) { }

  ngOnInit() {
  }

  @HostListener('mouseup') onClick() {
    if (!this.isSelected) {
      this.isSelected = true;
      this.select(this.selectedBgColor, this.selectedColor, this.isBold);
    } else {
      this.isSelected = false;
      this.select(null, null, null);
    }
  }

  select(bgColor: string, color?: string, isBold?: Boolean) {
    this.el.nativeElement.style.backgroundColor = bgColor;
    if (color) {
      this.el.nativeElement.style.color = color;
    }
    if (isBold && isBold === true) {
      this.el.nativeElement.style.fontWeight = 'bold';
    } else {
      this.el.nativeElement.style.fontWeight = 'normal';
    }
  }
}
