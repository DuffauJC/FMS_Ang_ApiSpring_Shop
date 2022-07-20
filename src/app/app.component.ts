import { Component, DoCheck, OnInit } from '@angular/core';
import { AuthenticateService } from 'src/app/services/authentificate.service';
import { CartService } from './services/cart.service';
import { Customer } from './model/customer.model';

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
 

}
