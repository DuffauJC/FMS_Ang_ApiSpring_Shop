import { Component, OnInit, DoCheck } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from 'src/app/services/cart.service';
import { AuthenticateService } from 'src/app/services/authentificate.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
})
export class OrderComponent implements OnInit, DoCheck {
  dateOrder: Date = new Date();
  problemOrder = false
  displayStyle = "none";
  constructor(public cartService: CartService,
    private router: Router,
    public authenticateService: AuthenticateService) { }

  ngOnInit(): void {

  }
  ngDoCheck(): void {
    this.verifySession()
  }
  onOrder() {
    this.displayStyle = "block";

  }
  confirmOrder() {
    this.displayStyle = "none";
    this.cartService.clear();
    this.router.navigateByUrl('');
  }
  closePopup() {
    this.displayStyle = "none";

  }
  verifySession() {
    let customer = this.authenticateService.getCustomerFromStorage()
    // console.log(customer)
    if (customer.firstName === "unknown") {
      this.problemOrder = true
      setTimeout(() => {
        this.problemOrder = false
        this.router.navigateByUrl('login')
      }, 1500)
    } 

  }
}
