import { Component, OnInit, DoCheck } from '@angular/core';
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

  constructor(private cartService: CartService, private apiService: ApiService,
   ) {
  }

  ngOnInit(): void {
    this.getAllTrainings()
  }
  ngDoCheck(): void {
    this.findButton()

  }
  getAllTrainings() {
    this.apiService.getTrainings().subscribe({
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
  }
}
