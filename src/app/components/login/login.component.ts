import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticateService } from 'src/app/services/authentificate.service';

@Component({
    selector: 'app-login',
    templateUrl: 'login.component.html'
})

export class LoginComponent implements OnInit {
    ngForm: FormGroup
    data = {
        username: "",
        password: ""
    }
    display = false
    problemLogin = false

    constructor(private authenticateService: AuthenticateService,
        private router: Router) {

        this.ngForm = new FormGroup({
            username: new FormControl(this.data.username),
            password: new FormControl(this.data.password)
        })
    }

    ngOnInit() {

    }

    onLogin(form: FormGroup): void {
        //console.log(form.value);
        if (form.valid) {
            this.data.username = form.value.username
            this.data.password = form.value.password

            //console.log(this.data)
            document.getElementById('modal-btn')?.classList.toggle("is_active")
            let ok = this.authenticateService.veriFyLogin(this.data)
            console.log(ok)
            // if (ok) {
            //     this.display = true
            //     setTimeout(() => {
            //         this.display = false
            //         this.router.navigateByUrl('home')
            //     }, 1500)
            // } else {
            //     this.problemLogin = true
            // }
            // setTimeout(() => {
            //     this.problemLogin = false
            // }, 1500)
        }

    }


}