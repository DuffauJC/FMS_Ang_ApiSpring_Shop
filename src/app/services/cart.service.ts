import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { OrdersItem } from '../model/ordersItem.model';
import { Training } from '../model/training.model';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  // pour ranger les données du storage
  private cart: Map<number, Training>;
  //Initialisation du local storage (panier)
  caddy = window.localStorage;

  constructor(private http: HttpClient, private apiservice: ApiService, private router: Router) {

    // au démarrage du service, je récupère le contenu du local storage : command en cours
    let cart = this.caddy.getItem('cart');
    if (cart) {  // le panier existe déjà
      this.cart = new Map(JSON.parse(cart));
    } // sinon il faut le créer
    else this.cart = new Map<number, Training>();
  }

  // add item to locastorage
  addTraining(Training: Training) {
    let tr = this.cart.get(Training.id)
    if (tr) {
      tr.quantity += Training.quantity
    } else {
      this.cart.set(Training.id, Training);
    }
    this.saveCart(); //à chaque fois que j'ajoute un élément au panier, je met à jour le local storage

  }
  saveCart() {
    this.caddy.setItem('cart', JSON.stringify([...this.cart]));
  }
  // load caddy (cart)
  loadCaddy() {
    return Array.from(this.cart.values());
  }

  // methode return total caddy
  getTotal() {
    let amount = 0;
    this.cart.forEach(Training => {
      amount += Training.price * Training.quantity;
    });
    return amount;
  }
  // caddy lenght (header nav)
  caddylenght() {
    return this.cart.size
  }
  // delete item from localstorage
  delStorage(item: Training) {
    this.cart.delete(item.id);
    this.saveCart();

  }

  clear() {
    this.cart.clear();
    localStorage.removeItem('cart')
  }

  // creation commande + ajout des items après recup de l'id de la commande
  saveOrder(id: number) {
    
    let order = {
      customerId: id,
      date: new Date(),
      amount: this.getTotal()
    }
    let items = this.loadCaddy()

    return this.apiservice.postOrder(order).subscribe({
      //next: (data) => this.ordersId = data.ordersId
      next: (data) => {
        items.forEach((e) => this.apiservice.postOrdersItem(new OrdersItem(data.ordersId, e.quantity, e.id)))
        this.router.navigateByUrl('order/'+data.ordersId)
       
        
      }

    })

  }

}
