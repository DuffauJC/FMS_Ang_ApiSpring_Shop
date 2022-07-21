import { Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { Category } from '../../model/category.model';


@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
})

export class CategoriesComponent implements OnInit {

  listCategories: Category[] | undefined
  error = null;
 
  constructor(
    private router: Router, private apiservice: ApiService
  ) {

  }

  ngOnInit(): void {
    this.getAllCategories()
  }


  getAllCategories() {
    this.listCategories = []
    this.apiservice.getCategories().subscribe({
      next: (data) => this.listCategories = data,
      error: (err) => this.error = err.message,
      complete: () => this.error = null
    })
  }
  onCategoryTrainings(id: any) {
    this.router.navigateByUrl('trainingsByCategory/' + id)
  }

}
