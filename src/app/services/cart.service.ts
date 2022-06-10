import { Injectable } from '@angular/core';
import { Article } from '../model/article.model';


@Injectable({
  providedIn: 'root'
})
export class CartService {
  // pour ranger les données du storage
  private cart: Map<number, Article>;
  //Initialisation du local storage (panier)
  caddy = window.localStorage;

  constructor() {
    // au démarrage du service, je récupère le contenu du local storage : command en cours
    let cart = this.caddy.getItem('cart');
    if (cart) {  // le panier existe déjà
      this.cart = new Map(JSON.parse(cart));
    } // sinon il faut le créer
    else this.cart = new Map<number, Article>();
  }

  // add item to locastorage
  addArticle(article: Article) {
    let tr=this.cart.get(article.id)
    if (tr) {
     tr.qty+=article.qty
    } else {
      this.cart.set(article.id, article);
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
    this.cart.forEach(article => {
      amount += article.unitaryPrice * article.qty;
    });
    return amount;
  }
// caddy lenght (header nav)
  caddylenght() {
   return this.cart.size
  }
  // delete item from localstorage
  delStorage(item: Article) {
    this.cart.delete(item.id);
    this.saveCart();

  }
 
  clear() {
    this.cart.clear();
    localStorage.removeItem('cart')
  }

}
