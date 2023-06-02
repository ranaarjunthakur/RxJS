import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class UsersDataService {

  // url="https://api.github.com/users/hadley/orgs";

  constructor(private http:HttpClient) { }

  userss(){
    return this.http.get('https://api.github.com/repos/hadley/ggplot2/commits');
  }
}
