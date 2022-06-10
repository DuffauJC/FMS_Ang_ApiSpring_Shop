import { Component, OnInit, DoCheck } from '@angular/core';
import { Store } from '@ngrx/store';
import { map, Observable } from 'rxjs';
import { GetAllTrainingsAction } from 'src/app/state/trainings.action';
import { selectAllTrainings } from 'src/app/state/trainings.selectors';
import { Training } from '../../model/training.model';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-trainings',
  templateUrl: './trainings.component.html',
})

export class TrainingsComponent implements OnInit, DoCheck {

  trainings$: Observable<Training[]> | null = null

  listTrainings: Training[] | undefined
  error = null

  constructor(private cartService: CartService,
    private store: Store<any>) {
  }

  ngOnInit(): void {
    this.store.dispatch(new GetAllTrainingsAction({}));
    this.trainings$ = this.store.select(selectAllTrainings).pipe(
      map((state) => state));
  }
  ngDoCheck(): void {
    this.findButton()

  }

  onAddToCart(training: Training) {
    //this.display = true
    this.cartService.addTraining(training)
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
