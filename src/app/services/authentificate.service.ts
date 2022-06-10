import { Injectable } from '@angular/core';
import { Customer } from '../model/customer.model';
import { ApiService } from './api.service';

@Injectable({ providedIn: 'root' })

export class AuthenticateService {

    error = null
    ok=true
    constructor( private apiService: ApiService) {
    }
    // login verification
    veriFyLogin(data: any) {
       // console.log(data)
        
        this.apiService.getCustomer(data.email).subscribe(response => {
            //console.log(response[0])

            // if existant user mail in response && decode password verif
            if (response[0].email === data.email && window.atob(response[0].password) === data.password) {
                this.setCustomerInStorage({
                    email: response[0].email,
                    name: response[0].name,
                    firstName: response[0].firstName,
                    address: response[0].address,
                    phoneNumber:response[0].phoneNumber,
                    role: response[0].role
                })
                this.ok = true
            } else {
                this.ok = false
            }
        })
        if (this.ok) {
            console.log('ok');
            return true
        } else {
            console.log('false');
            return false
        }

    }

    // set customer in storage
    setCustomerInStorage(data: any) {
        localStorage.setItem('customer', JSON.stringify(data));

    }
    // get customer from storage
    getCustomerFromStorage() {
        let customer = localStorage.getItem('customer');
        if (customer) return JSON.parse(customer);
        return new Customer("","unknown","","","","","")
    }
    removeCustomerFromStorage() {
        localStorage.removeItem('customer')
    }
}