import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject, BehaviorSubject, ReplaySubject, AsyncSubject, Observable, of, delay} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DesignUtilityService {

  url:any

  exclusive = new Subject<boolean>()            //TODO: Suject creating 

  // userName = new Subject<any>()
  userName = new BehaviorSubject<any>('Arjun')  //TODO: we can set value using  BehaviorSubject

  videoEmit = new ReplaySubject<any>(5)         //TODO: replay Suject creating
  //  videoEmit = new ReplaySubject<any>(5 ,5000) 

  asyncVideoEmit = new AsyncSubject<any>()      //TODO: Async Suject creating 


  constructor(private http:HttpClient) { }



  // for creating a list item //

  print(val: any, containerId: any) {
    let el = document.createElement('li')
    el.innerText = val;
    document.getElementById(containerId)?.appendChild(el)
  }

//for creating a notification div //

notification(val:any,containerId:any){
  let dialogBox = document.createElement('div')
  dialogBox.className="dialog-box",
  dialogBox.style.cssText=`   
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.06);`

  dialogBox.innerHTML = val;
  document.getElementById(containerId)?.prepend(dialogBox)
}



// Searches Result API //

getSearches(searchTerm:any):Observable<any>{
  this.url ='https://jsonplaceholder.typicode.com/posts';
  return this.http.get<any>(this.url+'?q='+searchTerm)
}

//Another example of switchmap search filter//

countries: string[] = [
  "India",
  "Afghanistan",
  "Spain",
  "Australia",
  "Nigeria"
];

GetFilteredCountries(searchTerm: string): Observable<string[]> {
  console.log("initiated service");
  return of(
    this.countries.filter(val => val.toLowerCase().indexOf(searchTerm.toLowerCase()) >= 0)
  ).pipe(delay(1000));
}


// CatchError & throw error api data

getBeers(): Observable<any> {
  let apiUrl= 'https://api.punkapi.com/v2/beers';
  return this.http.get(apiUrl);
}



}
