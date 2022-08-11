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
        //console.log(data)
        
        this.apiService.login(data).subscribe(response => {
            console.log(response.accessToken)

            // if accesstoken
            if (response.accessToken !="") {
                this.setCustomerInStorage({
                    id:response.id,
                    email: response.email,
                    username: response.username,
                    roles: response.role
                })
                localStorage.setItem('accessToken',JSON.stringify(response.accessToken))
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