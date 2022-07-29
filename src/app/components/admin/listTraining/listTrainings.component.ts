import { Component, DoCheck, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Training } from 'src/app/model/training.model';
import { AuthenticateService } from 'src/app/services/authentificate.service';
import { ApiService } from 'src/app/services/api.service';
import { Category } from 'src/app/model/category.model';

@Component({
    selector: 'app-listTrainings',
    templateUrl: 'listtrainings.component.html'
})

export class ListTrainingsComponent implements OnInit, DoCheck {
    ngForm: FormGroup
    listTrainings: Training[] | undefined
    model: Category | undefined
    listCategories: Category[] | undefined
    error = null
    displayStyle = "none";
    displayBlur = "blur(0)"
    display = false
    problemAdmin = false
    selectedFile = false

    data = {
        id: 0,
        name: "",
        description: "",
        price: 0,
        quantity: 1,
        imgURL: "",
        catId: 0
    }

    file!: File;

    constructor(
        private apiService: ApiService,
        private router: Router, public authenticateService: AuthenticateService
    ) {
        this.data = {
            id: 0,
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
            catId: new FormControl(this.data.catId),
        })
    }
    ngOnInit() {
        this.getAllTrainings()
        this.getAllCategories()
    }
    ngDoCheck(): void {
        this.verifySession()
    }
    /// img 
    processFile(event: any) {
        // const file: File = event.target.files[0];
        this.file = event.target.files[0];
        //console.log(this.file.name)
        this.selectedFile = true

    }
    ////////////////
    getAllTrainings() {
        this.apiService.getTrainings().subscribe({
            next: (data) => this.listTrainings = data,
            error: (err) => this.error = err.message,
            complete: () => this.error = null

        })
    }
    getAllCategories() {
        this.apiService.getCategories().subscribe({
            next: (data) => this.listCategories = data,
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
    delItem(training: Training) {
        if (confirm("Vous êtes sur de vouloir supprimer cette formation ?")) {
            this.apiService.delItem(training)
                .subscribe({
                    next: (data) => console.log(data),
                    error: (err) => this.error = err.message,
                    complete: () => this.getAllTrainings()
                })
        }

    }
    openPopup(training: Training) {
        this.displayStyle = "block";
        this.displayBlur = "blur(4px)"

        this.ngForm = new FormGroup({
            name: new FormControl(training.name),
            description: new FormControl(training.description),
            price: new FormControl(training.price),
            quantity: new FormControl(training.quantity),
            imgURL: new FormControl(training.imgURL),
            catId: new FormControl(training.category.id),
        })
        this.data.imgURL = training.imgURL
        this.data.id = training.id
        this.data.catId = training.category.id
    }
    closePopup() {
        this.displayStyle = "none";
        this.displayBlur = "blur(0)"
    }
    onUpdateTraining(form: FormGroup) {

        //console.log(form.value)

        this.data.name = form.value.name
        this.data.description = form.value.description
        this.data.price = form.value.price
        this.data.catId = parseInt(form.value.catId)

        if (this.selectedFile) {
            this.data.imgURL = this.file.name
        }
        //console.log(this.data)

        document.getElementById('modal-btn')?.classList.toggle('is_active')

        this.apiService.uploadImage(this.file).subscribe({
            // next:(data)=>console.log(data)
        })
        this.apiService.updateTraining(this.data)
            .subscribe({
                next: (data) => console.log(data),
                error: (err) => this.error = err.message,
                complete: () => this.getAllTrainings()
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