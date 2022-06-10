import { Component, OnInit, DoCheck } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticateService } from 'src/app/services/authentificate.service';
import { ApiService } from 'src/app/services/api.service';


@Component({
    selector: 'app-addtraining',
    templateUrl: 'addTraining.component.html'
})

export class AddTrainingComponent implements OnInit, DoCheck {
    ngForm: FormGroup
    display = false
    problemAdmin = false
    error = ""
    data = {
        name: "",
        description: "",
        price: 0,
        quantity: 1,
        imgURL: "assets/img/unknown.png",
    }

    constructor(private apiService: ApiService,
        private router: Router, public authenticateService: AuthenticateService
    ) {

        this.ngForm = new FormGroup({
            name: new FormControl(this.data.name),
            description: new FormControl(this.data.description),
            price: new FormControl(this.data.price),
            quantity: new FormControl(this.data.quantity),
            imgURL: new FormControl(this.data.imgURL),

        })
    }

    ngOnInit() {
        this.formData()
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
    onSaveTraining(form: FormGroup) {

        //console.log(form.value)

        this.data.name = form.value.name
        this.data.description = form.value.description
        this.data.price = form.value.price
        this.data.quantity = this.data.quantity
        this.data.imgURL = form.value.imgURL

        document.getElementById('modal-btn')?.classList.toggle("is_active")

        this.apiService.postTraining(this.data)
            .subscribe({
                next: (data) => console.log(data),
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
}