import { Component, OnInit, DoCheck } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CartService } from 'src/app/services/cart.service';
import { AuthenticateService } from 'src/app/services/authentificate.service';
import { ApiService } from 'src/app/services/api.service';
import { OrdersItem } from 'src/app/model/ordersItem.model';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
})
export class OrderComponent implements OnInit, DoCheck {
  dateOrder: Date = new Date();
  problemOrder = false
  displayStyle = "none";
  displayConfirm = "none";

  Orders: number|undefined
  error = null;

  constructor(public cartService: CartService,
    private router: Router, private route: ActivatedRoute, private apiservice: ApiService,
    public authenticateService: AuthenticateService) {
    
  }

  ngOnInit(): void {
    //const id = Number(this.route.snapshot.paramMap.get('id'));
    this.getOrder()
  }
  ngDoCheck(): void {
    this.verifySession()
    //this.getOrder()
  }
  onOrder() {
    this.displayStyle = "block";

  }
  confirmOrder() {
    this.displayStyle = "none";
    let customer = this.authenticateService.getCustomerFromStorage()
    // ajouter méthode de création commande
    this.cartService.saveOrder(customer.id)
    this.cartService.clear();
    this.getOrder()
  }
  closePopup() {
    this.displayStyle = "none";

  }
  closeOrder() {
    this.router.navigateByUrl('');

  }


  verifySession() {
    let customer = this.authenticateService.getCustomerFromStorage()
    if (customer.firstName === "unknown") {
      this.problemOrder = true
      setTimeout(() => {
        this.problemOrder = false
        this.router.navigateByUrl('login')
      }, 1500)
    }

  }
  getOrder() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.Orders = id
    if (this.Orders>0) {
     this.displayConfirm = "block";  
    } else {
      this.displayConfirm="none"
    }
  }
}
