import { Directive, Renderer2, ElementRef, OnInit, HostListener, Input, AfterViewInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { MatIconRegistry } from '@angular/material';

@Directive({
  selector: '[appSelected]'
})
export class SelectedDirective implements OnInit, AfterViewInit {
  @Input('selectedBgColor') selectedBgColor: string;
  @Input('selectedColor') selectedColor: string;
  @Input('isBold') isBold: Boolean;
  isSelected: Boolean = false;
  originalInnerHTML: string;

  constructor(private el: ElementRef, private renderer: Renderer2,
    private iconRegistry: MatIconRegistry, private sanitizer: DomSanitizer) {
    iconRegistry.addSvgIcon(
      'thumbs-up',
      sanitizer.bypassSecurityTrustResourceUrl('assets/icons/thumbup-icon.svg'));
  }

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.originalInnerHTML = this.el.nativeElement.innerHTML;
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
      this.el.nativeElement.innerHTML
        += '&nbsp;<img src="assets/icons/outline-highlight_off-24px.svg" height="12" width="12">';
    } else {
      this.el.nativeElement.style.fontWeight = 'normal';
      this.el.nativeElement.innerHTML = this.originalInnerHTML;
    }
  }
}
