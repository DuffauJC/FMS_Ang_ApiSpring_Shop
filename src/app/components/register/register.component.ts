import { Component, OnInit } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
    selector: 'app-register',
    templateUrl: 'register.component.html'
})

export class RegisterComponent implements OnInit {
    ngForm: FormGroup
    display = false
    error=""
    data = {
        name: "",
        firstName: "",
        address: "",
        email: "",
        phoneNumber: "",
        password: "",
        role: "customer"
    }
    constructor(public cartService: CartService,
        private router: Router,
        private apiService: ApiService) {


        this.ngForm = new FormGroup({
            name: new FormControl(this.data.name),
            firstName: new FormControl(this.data.firstName),
            address: new FormControl(this.data.address),
            email: new FormControl(this.data.email),
            phoneNumber: new FormControl(this.data.phoneNumber),
            password: new FormControl(this.data.password),
            role: new FormControl(this.data.role),
        })

    }

    ngOnInit(): void {

    }

    onSaveCustomer(form: FormGroup) {
        //console.log(form.value)
        if (form.valid) {
            this.display = true

            this.data.name = form.value.name
            this.data.firstName = form.value.firstName
            this.data.address = form.value.address
            this.data.email = form.value.email
            this.data.phoneNumber = form.value.phoneNumber
            this.data.role = this.data.role

            // encode password
            this.data.password = window.btoa(form.value.password);


            this.apiService.postCustomer(this.data)
                .subscribe({
                    next: (data) => console.log(data),
                    error: (err) => this.error = err.message,
            })
            setTimeout(() => {
                this.display = false
                this.router.navigateByUrl('login')
            }, 1500)

        }


    }
}