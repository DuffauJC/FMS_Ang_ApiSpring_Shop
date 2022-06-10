import { Component, DoCheck, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Article } from 'src/app/model/article.model';
import { AuthenticateService } from 'src/app/services/authentificate.service';
import { ApiService } from 'src/app/services/api.service';

@Component({
    selector: 'app-listArticles',
    templateUrl: 'listArticles.component.html'
})

export class ListArticlesComponent implements OnInit, DoCheck {
    ngForm: FormGroup
    listArticles: Article[] | undefined
    error = null
    displayStyle = "none";
    displayBlur = "blur(0)"
    display = false
    problemAdmin = false

    data = {
        id: 0,
        name: "",
        description: "",
        price: 0,
        quantity: 0,
        imgURL: "",
    }


    constructor(
        private apiService: ApiService,
        private router: Router, public authenticateService: AuthenticateService
    ) {
        this.data = {
            id: 0,
            name: "",
            description: "",
            price: 0,
            quantity: 0,
            imgURL: "assets/img/unknown.png",
        }
        this.ngForm = new FormGroup({
            name: new FormControl(this.data.name),
            description: new FormControl(this.data.description),
            price: new FormControl(this.data.price),
            quantity: new FormControl(this.data.quantity),
            imgURL: new FormControl(this.data.imgURL),

        })
    }
    ngOnInit() {
        this.getAllArticles()
    }
    ngDoCheck(): void {
        this.verifySession()
    }

    getAllArticles() {
        this.apiService.getArticles().subscribe({
            next: (data) => this.listArticles = data,
            error: (err) => this.error = err.message,
            complete: () => this.error = null

        })
    }
    verifySession() {
        let customer = this.authenticateService.getCustomerFromStorage()
        // console.log(customer)
        if (customer.role != "admin") {
            this.problemAdmin = true
            setTimeout(() => {
                this.problemAdmin = false
                this.router.navigateByUrl('login')
            }, 1500)
        }
    }
    delItem(Article: Article) {
        if (confirm("Vous êtes sur de vouloir supprimer cette formation ?")) {
            this.apiService.delItem(Article)
                .subscribe({
                    next: (data) => console.log(data),
                    error: (err) => this.error = err.message,
                    complete: () => this.getAllArticles()
            })
        }

    }
    openPopup(Article: Article) {
        this.displayStyle = "block";
        this.displayBlur = "blur(4px)"

        // this.ngForm = new FormGroup({
        //     name: new FormControl(Article.name),
        //     description: new FormControl(Article.description),
        //     price: new FormControl(Article.price),
        //     quantity: new FormControl(Article.quantity),
        //     imgURL: new FormControl(Article.imgURL),

        // })
        this.data.imgURL = Article.imgURL
        this.data.id = Article.id
    }
    closePopup() {
        this.displayStyle = "none";
        this.displayBlur = "blur(0)"
    }
    onUpdateArticle(form: FormGroup) {

        //console.log(form.value)


        this.data.name = form.value.name
        this.data.description = form.value.description
        this.data.price = form.value.price
        this.data.imgURL = form.value.imgURL

        document.getElementById('modal-btn')?.classList.toggle('is_active')

        this.apiService.updateArticle(this.data)
            .subscribe({
                next: (data) => console.log(data),
                error: (err) => this.error = err.message,
                complete: () => this.getAllArticles()
        })
        this.display = true

        setTimeout(() => {
            this.display = false
            this.displayStyle = "none";
            this.displayBlur = "blur(0)"
            document.getElementById('modal-btn')?.classList.toggle('is_active')
            this.ngOnInit()
        }, 500)
    }

}