import { Injectable } from '@angular/core';
import { HttpClient,HttpParams } from '@angular/common/http';
import { Article } from '../model/article.model';
import { environment } from 'src/environments/environment';
import { Customer } from '../model/customer.model';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })

export class ApiService {
    constructor(private http: HttpClient) { }
    //Article
    public getArticles():Observable<Article[]> {
        return this.http.get<Article[]>(environment.host + "/articles")
    }
    public getArticleById(id: number) {
        return this.http.get<Article>(environment.host + "/articles/" + id);
    }
    public postArticle(data: any) {
        //console.log(data);
       return this.http.post<any>(environment.host + "/articles", data)
          
    }
    public delItem(Article: Article) {
        //console.log(Article)
       return this.http.delete(environment.host + "/articles/" + Article.id)
          
    }
    public updateArticle(data: any) {
        //console.log(data);
       return this.http.put<any>(environment.host + "/articles/" + data.id, data)
       
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