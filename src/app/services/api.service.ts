import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpHeaders, HttpParams } from '@angular/common/http';
import { Training } from '../model/training.model';
import { environment } from 'src/environments/environment';
import { Customer } from '../model/customer.model';
import { catchError, Observable } from 'rxjs';
import { Category } from '../model/category.model';
import { Orders } from '../model/orders.model';
import { OrdersItem } from '../model/ordersItem.model';

@Injectable({ providedIn: 'root' })

export class ApiService {
    constructor(private http: HttpClient) { }
    //Training
    public getTrainings(): Observable<Training[]> {
        return this.http.get<Training[]>(environment.host + "/api/trainings")
    }
    public getTrainingById(id: number) {
        return this.http.get<Training>(environment.host + "/api/trainings/" + id);
    }

    public postTraining(data: any) {
       // console.log(data);
        return this.http.post<any>(environment.host + "/api/trainings", data)

    }
    // upload img
    public uploadImage(file: File): Observable<Response> {
        const formData: FormData = new FormData();
        formData.append('file', file);
        return this.http.post<any>(environment.host + "/api/uploadfile", formData)
    }
    public delItem(training: Training) {
        //console.log(Training)
        return this.http.delete(environment.host + "/api/trainings/" + training.id)

    }
    public updateTraining(data: any) {
        //console.log(data);
        return this.http.put<any>(environment.host + "/api/updateTraining",data)

    }
    // save customer in bdd
    public postCustomer(data: any) {
        //console.log(data);
        return this.http.post<any>(environment.host + "/api/customer", data)

    }
    // get customer with mail param
    public login(data: any) {
        // let headerss = new HttpHeaders({
        //     'Content-Type': 'application/json',
        //     'Access-Control-Allow-Origin': 'http://localhost:4200',
        //     'Access-Control-Allow-Headers': 'Content-Type',

        // });

        //return this.http.post<any>(environment.hostAuth, { payload }, { headers: headerss });
        return this.http.post<any>(environment.host + "/api/auth/signin", data)
    }

    // categories
    public getCategories() {
        return this.http.get<Category[]>(environment.host + "/api/categories")
    }
    public getTrainingsByCategoryId(id: any) {
        // return this.http.get<any>(environment.host + "/categories/" + id + "/trainings")
        return this.http.get<Training[]>(environment.host + "/api/trainingsByCategory/" + id)
    }
    public getCategoryById(id: number) {
        return this.http.get<Category>(environment.host + "/api/categoryById/" + id);
    }


    // save order in bdd
    public postOrder(order: any) {
        return this.http.post<any>(environment.host + "/api/orders", order)
    }
    // save order in bdd
    public postOrdersItem(orderItem: OrdersItem) {
        return this.http.post<OrdersItem>(environment.host + "/api/ordersItem", orderItem).subscribe()
    }
    public getOrderById(id: number) {
        return this.http.get<Orders>(environment.host + "/api/orders/" + id);
    }
    public getOrderItemsById(id: number) {
        return this.http.get<any>(environment.host + "/api/ordersItemByOrder/" + id);
    }
}