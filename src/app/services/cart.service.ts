import { Injectable } from '@angular/core';
import { Training } from '../model/training.model';


@Injectable({
  providedIn: 'root'
})
export class CartService {
  // pour ranger les données du storage
  private cart: Map<number, Training>;
  //Initialisation du local storage (panier)
  caddy = window.localStorage;

  constructor() {
    // au démarrage du service, je récupère le contenu du local storage : command en cours
    let cart = this.caddy.getItem('cart');
    if (cart) {  // le panier existe déjà
      this.cart = new Map(JSON.parse(cart));
    } // sinon il faut le créer
    else this.cart = new Map<number, Training>();
  }

  // add item to locastorage
  addTraining(training: Training) {
    let tr=this.cart.get(training.id)
    if (tr) {
     tr.quantity+=training.quantity
    } else {
      this.cart.set(training.id, training);
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
    this.cart.forEach(training => {
      amount += training.price * training.quantity;
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

}
