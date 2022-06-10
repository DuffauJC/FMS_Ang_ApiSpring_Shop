import { Component, DoCheck, OnInit } from '@angular/core';
import { AuthenticateService } from 'src/app/services/authentificate.service';
import { CartService } from './services/cart.service';
import { Customer } from './model/customer.model';
import { GetAllTrainingsAction } from './state/trainings.action';
import { Store } from '@ngrx/store';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit, DoCheck {
  title = 'traingings-front-app';
  customer: Customer | undefined
  name = ""
  role = ""
  display = false
  loggin = true
  logout = false
  caddySize = 0
  admin = false


  constructor(private authenticateService: AuthenticateService,
    private cartService: CartService,
    private store: Store<any>
  ) {
    this.customer = new Customer("unknown", "", "", "", "", "", "")
  }

  ngOnInit(): void {
    this.showName()
  }
  ngDoCheck(): void {
    this.showName()
    this.linkAdmin()
    this.caddySize = this.cartService.caddylenght()
  }

  showName() {
    this.name = this.authenticateService.getCustomerFromStorage().firstName
    if (this.name != "unknown") {
      this.display = true
      this.loggin = false
      this.logout = true
    }
  }
  linkAdmin() {
    this.role = this.authenticateService.getCustomerFromStorage().role
    if (this.role === "admin") {
      this.admin = true
    }
  }
  disconnect() {
    this.authenticateService.removeCustomerFromStorage()
    this.display = false
    this.loggin = true
    this.logout = false
    this.admin = false
  }
  getAllTrainings() {
    //User a cliqué sur le bouton afficher tous les produits aussi il faut dispatcher l'action à l'aide du store
    this.store.dispatch(new GetAllTrainingsAction({}));
    //Le reducer et l'effect ont reçu la notification du Store et ils ont pris le relais chacun de son côté
  }

}
