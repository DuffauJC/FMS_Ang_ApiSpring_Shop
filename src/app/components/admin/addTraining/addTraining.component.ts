import { Component, OnInit, DoCheck } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticateService } from 'src/app/services/authentificate.service';
import { ApiService } from 'src/app/services/api.service';
import { Category } from 'src/app/model/category.model';



class ImageSnippet {
    constructor(public file: File) { }
}
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

    training = {
        name: "",
        description: "",
        price: 0,
        quantity: 1,
        imgURL: "unknown.png",
        category: new Category(0, "", "")
    }
    data = {
        name: "",
        description: "",
        price: 0,
        quantity: 1,
        imgURL: "unknown.png",
        categoryId: 0
    }
    file!: File;
    selectedFile!: ImageSnippet;

    constructor(private apiService: ApiService,
        private router: Router, public authenticateService: AuthenticateService
    ) {

        this.ngForm = new FormGroup({
            name: new FormControl(this.data.name),
            description: new FormControl(this.data.description),
            price: new FormControl(this.data.price),
            quantity: new FormControl(this.data.quantity),
            imgURL: new FormControl(this.data.imgURL),
            categoryId: new FormControl(this.data.categoryId),

        })
    }

    /// img 
    processFile(event: any) {
        // const file: File = event.target.files[0];
        this.file = event.target.files[0];
        // console.log(this.file.name)
        this.data.imgURL = this.file.name
        this.selectedFile = new ImageSnippet(this.file);
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
        this.data.categoryId = parseInt(form.value.categoryId)

        document.getElementById('modal-btn')?.classList.toggle("is_active")
        this.training = {
            name: this.data.name,
            description: this.data.description,
            price: this.data.price,
            quantity: this.data.quantity,
            imgURL: this.file.name,
            category: new Category(0, "", "")
        }
        this.apiService.getCategoryById(this.data.categoryId).subscribe({
            next: (data) => {


                this.training.category.id = data.id
                this.training.category.description = data.description
                this.training.category.name = data.name
            }
        })

        this.apiService.uploadImage(this.selectedFile.file)
        this.apiService.postTraining(this.training)
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
            imgURL: "unknown.png",
            categoryId: 0
        }
        this.ngForm = new FormGroup({
            name: new FormControl(this.data.name),
            description: new FormControl(this.data.description),
            price: new FormControl(this.data.price),
            quantity: new FormControl(this.data.quantity),
            imgURL: new FormControl(this.data.imgURL),
            categoryId: new FormControl(this.data.categoryId)
        })
    }
}