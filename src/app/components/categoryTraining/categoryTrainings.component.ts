import { Component, OnInit, DoCheck} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Training } from 'src/app/model/training.model';
import { ApiService } from 'src/app/services/api.service';
import { CartService } from 'src/app/services/cart.service';
import { Location } from '@angular/common';


@Component({
  selector: 'app-categoryTrainings',
  templateUrl: './categoryTrainings.component.html',
})

export class CategoryTrainingsComponent implements OnInit, DoCheck {

  listTrainings: Training[] | undefined
  error = null;


  constructor(
    private router: Router, private apiservice: ApiService, private route: ActivatedRoute,
    private cartService: CartService, private location: Location
  ) {

  }

  ngOnInit(): void {
    this.getAllTrainings()
  }
  ngDoCheck(): void {
 
  }

  getAllTrainings() {
    this.listTrainings = []
    const id = Number(this.route.snapshot.paramMap.get('id'));

    this.apiservice.getTrainingsByCategoryId(id).subscribe({
      //next:(data)=>console.log(data._embedded.trainings),
      next: (data) => this.listTrainings = data._embedded.trainings,
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
