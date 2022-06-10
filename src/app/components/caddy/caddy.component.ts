import { Component, OnInit, DoCheck } from '@angular/core';
import { Training } from '../../model/training.model';
import { CartService } from '../../services/cart.service';
import { Router } from '@angular/router';
import { AuthenticateService } from 'src/app/services/authentificate.service';
@Component({
    selector: 'app-caddy',
    templateUrl: 'caddy.component.html'
})

export class CaddyComponent implements OnInit, DoCheck {
    listCaddy: Training[] | undefined
    total = 0
    display = false
    problemOrder = false

    constructor(private cartService: CartService, private router: Router, private authenticateService: AuthenticateService) { }

    // on load componenent
    ngOnInit(): void {
        this.listCaddy = []
        this.display = false
        this.listCaddy = this.cartService.loadCaddy()
        if (this.listCaddy.length != 0) {
            this.display = true
            this.total = this.cartService.getTotal()
        }
    }

    // after change vue
    ngDoCheck(): void {
        this.listCaddy = []
        this.display = false
        this.listCaddy = this.cartService.loadCaddy()
        if (this.listCaddy.length != 0) {
            this.display = true
            this.total = this.cartService.getTotal()
        }

    }

    // delete item from caddy
    onDelToCart(item: Training) {
        this.cartService.delStorage(item)
    }
    clearCart() {
        this.cartService.clear()
    }
    // valide order from caddy wuith user session
    onToOrder() {
        let customer = this.authenticateService.getCustomerFromStorage()
        // console.log(customer)
        if (customer.firstName === "unknown") {
            this.problemOrder = true
        } else {
            this.router.navigateByUrl('order')
        }
    }
}