import { Injectable } from '@angular/core';
import { HttpClient,HttpParams } from '@angular/common/http';
import { Training } from '../model/training.model';
import { environment } from 'src/environments/environment';
import { Customer } from '../model/customer.model';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })

export class ApiService {
    constructor(private http: HttpClient) { }
    //Training
    public getTrainings():Observable<Training[]> {
        return this.http.get<Training[]>(environment.host + "/trainings")
    }
    public getTrainingById(id: number) {
        return this.http.get<Training>(environment.host + "/trainings/" + id);
    }
    public postTraining(data: any) {
        //console.log(data);
       return this.http.post<any>(environment.host + "/trainings", data)
          
    }
    public delItem(training: Training) {
        //console.log(training)
       return this.http.delete(environment.host + "/trainings/" + training.id)
          
    }
    public updateTraining(data: any) {
        //console.log(data);
       return this.http.put<any>(environment.host + "/trainings/" + data.id, data)
       
    }
    // save customer in bdd
    public postCustomer(data: any) {
        //console.log(data);
       return this.http.post<any>(environment.host + "/customers", data)
       
    }
    // get customer with mail param
    public getCustomer(email: string) {
        //console.log(email)
        let queryParams = new HttpParams();
        queryParams = queryParams.append("email", email);
        //console.log(queryParams)
        return this.http.get<Customer[]>(environment.host + "/customers", { params: queryParams })
    }
}