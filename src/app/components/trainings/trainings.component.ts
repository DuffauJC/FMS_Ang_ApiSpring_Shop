import { Component, OnInit, DoCheck } from '@angular/core';
import { Router } from '@angular/router';
import { Category } from 'src/app/model/category.model';
import { ApiService } from 'src/app/services/api.service';
import { Training } from '../../model/training.model';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-trainings',
  templateUrl: 'trainings.component.html',
})

export class TrainingsComponent implements OnInit, DoCheck {

  listTrainings: Training[] | undefined
  error = null
  listCategories: Category[] | undefined


  constructor(private cartService: CartService, private apiservice: ApiService, private router: Router
  ) {
  }

  ngOnInit(): void {
    this.getAllTrainings()
    this.getAllCategories()
  }
  ngDoCheck(): void {
    this.findButton()

  }
  onCategoryTrainings(id: any) {
    //this.router.navigateByUrl('trainingsByCategory/' + id)
    this.getTrainingsByCategory(id)
  }

  getTrainingsByCategory(id: any) {
    this.listTrainings = []
    //const id = Number(this.route.snapshot.paramMap.get('id'));

    this.apiservice.getTrainingsByCategoryId(id).subscribe({
      //next:(data)=>console.log(data),
      next: (data) => this.listTrainings = data,
      error: (err) => this.error = err.message,
      complete: () => this.error = null
    })

  }
  getAllCategories() {
    this.apiservice.getCategories().subscribe({
      next: (data) => this.listCategories = data,
      error: (err) => this.error = err.message,
      complete: () => this.error = null

    })
  }
  getAllTrainings() {
    this.listTrainings = []
    this.apiservice.getTrainings().subscribe({
      next: (data) => this.listTrainings = data,
      error: (err) => this.error = err.message,
      complete: () => this.error = null
    })
  }

  onAddToCart(Training: Training) {
    //this.display = true
    this.cartService.addTraining(Training)
    this.remClick()

  }
  cartClick(this: any) {
    this.button = this;
    this.button.classList.add('clicked');
  }
  catCardClick(this: any) {
    this.div = this;
    this.div.classList.add('clickedCat');
    setTimeout(() => {
      this.div.classList.remove('clickedCat')
    }, 2000);
  }
  remClick() {
    const cartButtons = document.querySelectorAll('.cart-button');
    //console.log(cartButtons)
    cartButtons.forEach(button => {
      setTimeout(() => {
        button.classList.remove('clicked')
      }, 3000);

    })
  }
  findButton() {
    const cartButtons = document.querySelectorAll('.cart-button');
    //console.log(cartButtons)
    cartButtons.forEach(button => {
      button.addEventListener('click', this.cartClick);
    });

    const catCard = document.querySelectorAll('.cityCard')
    //console.log(catCard)
    catCard.forEach(div => {
      div.addEventListener('click', this.catCardClick);
    });
  }

}
