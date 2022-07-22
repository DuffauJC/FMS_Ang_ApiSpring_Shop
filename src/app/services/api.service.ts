import { Injectable } from '@angular/core';
import { HttpClient,HttpParams } from '@angular/common/http';
import { Training } from '../model/training.model';
import { environment } from 'src/environments/environment';
import { Customer } from '../model/customer.model';
import { Observable } from 'rxjs';
import { Category } from '../model/category.model';
import { Orders } from '../model/orders.model';

@Injectable({ providedIn: 'root' })

export class ApiService {
    constructor(private http: HttpClient) { }
    //Training
    public getTrainings():Observable<Training[]> {
        return this.http.get<Training[]>(environment.host + "/api/trainings")
    }
    public getTrainingById(id: number) {
        return this.http.get<Training>(environment.host + "/api/trainings/" + id);
    }
    public postTraining(data: any) {
        //console.log(data);
       return this.http.post<any>(environment.host + "/api/trainings", data)
          
    }
    public delItem(Training: Training) {
        //console.log(Training)
       return this.http.delete(environment.host + "/api/trainings/" + Training.id)
          
    }
    public updateTraining(data: any) {
        //console.log(data);
       return this.http.put<any>(environment.host + "/api/trainings/" + data.id, data)
       
    }
    // save customer in bdd
    public postCustomer(data: any) {
        //console.log(data);
       return this.http.post<any>(environment.host + "/api/customer", data)
       
    }
    // get customer with mail param
    public getCustomer(mail: string) {
        //console.log(mail)
        //let queryParams = new HttpParams();
        //queryParams = queryParams.append("mail", mail);
        //console.log(queryParams)
        //return this.http.get<Customer[]>(environment.host + "/api/customer", { params: queryParams })
        return this.http.get<any>(environment.host + "/api/customer/"+mail)
    }

    // categories
    public getCategories() {
        return this.http.get<Category[]>(environment.host + "/api/categories")
    }
    public getTrainingsByCategoryId(id: any) {
       // return this.http.get<any>(environment.host + "/categories/" + id + "/trainings")
        return this.http.get<Training[]>(environment.host + "/api/trainingsByCategory/" + id )
    }
    // save order in bdd
    public postOrder(data: any) {
        //console.log(data);
        return this.http.post<any>(environment.host + "/api/orders", data)

    }
}