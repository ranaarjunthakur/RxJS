import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { delay, retry, retryWhen, scan } from 'rxjs';

@Component({
  selector: 'app-retry',
  templateUrl: './retry.component.html',
  styleUrls: ['./retry.component.scss']
})
export class RetryComponent implements OnInit {

  url:any;
  person:any;
  fetching:boolean=false;
  status='no data'

  constructor(private http:HttpClient) { }

  ngOnInit(): void {
 
  }


  fetchDetails(){
    this.fetching=true;
    this.status='Fetching Data....'
    this.url = 'https://jsonplaceholder.typicode.com/todos/1'
    this.http.get(this.url).pipe(
      // retry(4)
      retryWhen(err=>err.pipe(
        delay(2000),
        scan((retryCount)=>{
          if(retryCount >=5){
            throw err;
          }else{
            retryCount =  retryCount +1 ;
            console.log('retryCount =>' + retryCount);
            this.status = 'Retrying Attempt #' + retryCount
            return retryCount
          }
        },0)
        ))
      )
    .subscribe((res)=>{
      // console.log(res);
      this.person=res;
      this.status='Data Fetched'
      this.fetching=false;
      console.log(this.person);
    },error=>{
      this.status='Problem Data Fetched'
      console.log(error)
      this.fetching=false;
    }
    )
  }

}
