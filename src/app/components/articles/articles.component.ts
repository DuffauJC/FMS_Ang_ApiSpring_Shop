import { Component, OnInit, DoCheck } from '@angular/core';
import { Store } from '@ngrx/store';
import { map, Observable } from 'rxjs';
import { GetAllArticlesAction } from 'src/app/state/articles.action';
import { selectAllArticles } from 'src/app/state/articles.selectors';
import { Article } from '../../model/article.model';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-Articles',
  templateUrl: './Articles.component.html',
})

export class ArticlesComponent implements OnInit, DoCheck {

  articles$: Observable<Article[]> | null = null

  listArticles: Article[] | undefined
  error = null

  constructor(private cartService: CartService,
    private store: Store<any>) {
  }

  ngOnInit(): void {
    this.store.dispatch(new GetAllArticlesAction({}));
    this.articles$ = this.store.select(selectAllArticles).pipe(
      map((state) => state));
  }
  ngDoCheck(): void {
    this.findButton()

  }

  onAddToCart(article: Article) {
    //this.display = true
    this.cartService.addArticle(article)
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
