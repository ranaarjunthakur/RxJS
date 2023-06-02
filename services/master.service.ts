import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MasterService {

  listArray=[
    {'email':"developer@gmail.com", "password":'123456789'}
  ]

  constructor() { }


  GetData(){
    return this.listArray
  }

  SaveData(input:any){
    this.listArray.push(input)
  }
}
