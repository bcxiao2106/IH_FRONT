import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiserviceService } from '../services/apiservice.service';
import { Category } from '../models/category';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {
  activeBgColor = 'white';
  activeColor = '#F8510D';
  selectedBgColor = 'rgba(248, 80, 13, 0.322)';
  selectedColor = 'black';
  isBold: Boolean = true;
  categories: Category[];
  @Output('categoryFilterEvent') categoryFilterEvent = new EventEmitter();
  selectedCategories: number[] = [];

  constructor(private apiService: ApiserviceService) { }

  ngOnInit() {
    this.apiService.getCategories().subscribe(
      categoryList => {
        if (!categoryList) {
          return;
        }
        this.categories = categoryList;
      }
    );
  }

  onSelect(cateId: number) {
    if (this.selectedCategories.indexOf(cateId) !== -1) {
      this.selectedCategories.splice(this.selectedCategories.indexOf(cateId), 1);
    } else {
      this.selectedCategories.push(cateId);
    }
    this.categoryFilterEvent.emit(this.selectedCategories);
  }

}
