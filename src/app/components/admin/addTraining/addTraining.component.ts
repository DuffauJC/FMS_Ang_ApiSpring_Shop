import { Component, OnInit, DoCheck } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticateService } from 'src/app/services/authentificate.service';
import { ApiService } from 'src/app/services/api.service';
import { Category } from 'src/app/model/category.model';

@Component({
    selector: 'app-addTraining',
    templateUrl: 'addTraining.component.html'
})

export class AddTrainingComponent implements OnInit, DoCheck {
    ngForm: FormGroup
    display = false
    problemAdmin = false
    error = null
    model: Category | undefined
    listCategories: Category[] | undefined

    data = {
        name: "",
        description: "",
        price: 0,
        quantity: 1,
        imgURL: "unknown.png",
        catId: 0
    }
    file!: File;


    constructor(private apiService: ApiService,
        private router: Router, public authenticateService: AuthenticateService
    ) {

        this.ngForm = new FormGroup({
            name: new FormControl(this.data.name),
            description: new FormControl(this.data.description),
            price: new FormControl(this.data.price),
            quantity: new FormControl(this.data.quantity),
            imgURL: new FormControl(this.data.imgURL),
            catId: new FormControl(this.data.catId),
        })
    }

    /// img 
    processFile(event: any) {
        // const file: File = event.target.files[0];
        this.file = event.target.files[0];
        // console.log(this.file.name)
        this.data.imgURL = this.file.name
       
    }
    ////////////////

    ngOnInit() {
        this.formData()
        this.getAllCategories()
    }
    ngDoCheck(): void {
        this.verifySession()
        this.data.imgURL = this.ngForm.value.imgURL
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
    getAllCategories() {
        this.apiService.getCategories().subscribe({
            next: (data) => this.listCategories = data,
            error: (err) => this.error = err.message,
            complete: () => this.error = null

        })
    }
    onSaveTraining(form: FormGroup) {
        // console.log(form.value)

        this.data.name = form.value.name
        this.data.description = form.value.description
        this.data.price = form.value.price
        this.data.quantity = this.data.quantity
        this.data.imgURL = this.file.name
        this.data.catId = parseInt(form.value.catId)

        document.getElementById('modal-btn')?.classList.toggle("is_active")
 
        this.apiService.uploadImage(this.file).subscribe({
           // next:(data)=>console.log(data)
        })
        this.apiService.postTraining(this.data)
            .subscribe({
                error: (err) => this.error = err.message,
                complete: () => this.router.navigateByUrl('listTrainings')
            })
        this.display = true
        setTimeout(() => {
            this.display = false
            document.getElementById('modal-btn')?.classList.toggle("is_active")
            this.ngOnInit()
        }, 1500)
    }
    formData() {
        this.data = {
            name: "",
            description: "",
            price: 0,
            quantity: 1,
            imgURL: "unknown.png",
            catId: 0
        }
        this.ngForm = new FormGroup({
            name: new FormControl(this.data.name),
            description: new FormControl(this.data.description),
            price: new FormControl(this.data.price),
            quantity: new FormControl(this.data.quantity),
            imgURL: new FormControl(this.data.imgURL),
            catId: new FormControl(this.data.catId)
        })
    }
}