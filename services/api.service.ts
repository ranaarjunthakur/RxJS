import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  url = 'https://jsonplaceholder.typicode.com/todos/10';

  constructor(private http: HttpClient) { }


  getData(): Observable<any> {
    return this.http.get(this.url)
  }

}
