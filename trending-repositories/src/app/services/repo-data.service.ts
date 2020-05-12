import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class RepoDataService {
  baseUrl : string="https://api.github.com/search/";
  perPage:Number=10;
  lastMonth:string;
  constructor(private  http: HttpClient) { 
    let d = new Date();
    d.setDate(d.getDate()-30);
    this.lastMonth=d.toLocaleDateString('fr-CA')
  }

  getByPage(p): Observable<any> {
    return this.http.get<Observable<any>>(this.baseUrl + 'repositories?q=created:>'+this.lastMonth+'&sort=stars&per_page='+this.perPage+'&order=desc&page='+p);
  }
}
