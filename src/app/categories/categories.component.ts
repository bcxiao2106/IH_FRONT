import { Component, OnInit, Output, EventEmitter, ElementRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiserviceService } from '../services/apiservice.service';
import { Category } from '../models/category';
import { DomSanitizer } from '@angular/platform-browser';
import { MatIconRegistry } from '@angular/material';
import { createRendererV1 } from '../../../node_modules/@angular/core/src/view/refs';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {
  activeBgColor = 'white';
  activeColor = '#F8510D';
  selectedBgColor = 'rgba(248, 80, 13, 0.322)';
  selectedColor = 'rgba(58, 58, 58)';
  isBold: Boolean = true;
  resetSignal: Boolean = false;
  categories: Category[];
  @Output('categoryFilterEvent') categoryFilterEvent = new EventEmitter();
  selectedCategories: number[] = [];

  constructor(private apiService: ApiserviceService, private iconRegistry: MatIconRegistry, private sanitizer: DomSanitizer) {
    iconRegistry.addSvgIcon(
      'thumbs-up',
      sanitizer.bypassSecurityTrustResourceUrl('assets/icons/thumbup-icon.svg'));
  }

  ngOnInit() {
    this.apiService.getCategories().subscribe(
      categoryList => {
        if (!categoryList) {
          return;
        }
        this.categories = categoryList.sort((cate1, cate2): number => {
          return cate1.CategoryName.localeCompare(cate2.CategoryName);
        });
      }
    );
  }

  onSelect(cateId: number) {
    if (this.resetSignal) {
      this.resetSignal = false;
    }
    if (this.selectedCategories.indexOf(cateId) !== -1) {
      this.selectedCategories.splice(this.selectedCategories.indexOf(cateId), 1);
      
    } else {
      this.selectedCategories.push(cateId);
    }
    this.categoryFilterEvent.emit(this.selectedCategories);
  }

  resetAll() {
    this.resetSignal = true;
    this.selectedCategories = [];
    this.categoryFilterEvent.emit(this.selectedCategories);
    // this.ngOnInit();
  }

}
