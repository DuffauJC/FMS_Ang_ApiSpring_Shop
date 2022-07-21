import { Injectable } from '@angular/core';
import { HttpClient,HttpParams } from '@angular/common/http';
import { Training } from '../model/training.model';
import { environment } from 'src/environments/environment';
import { Customer } from '../model/customer.model';
import { Observable } from 'rxjs';
import { Category } from '../model/category.model';

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
       return this.http.post<any>(environment.host + "/api/customers", data)
       
    }
    // get customer with mail param
    public getCustomer(email: string) {
        //console.log(email)
        let queryParams = new HttpParams();
        queryParams = queryParams.append("email", email);
        //console.log(queryParams)
        return this.http.get<Customer[]>(environment.host + "/api/customers", { params: queryParams })
    }

    // categories
    public getCategories() {
        return this.http.get<Category[]>(environment.host + "/api/categories")
    }
    public getTrainingsByCategoryId(id: any) {
        return this.http.get<any>(environment.host + "/categories/" + id+"/trainings")
    }
}