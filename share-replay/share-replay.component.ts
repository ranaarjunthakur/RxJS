import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Observable, map, filter, shareReplay } from 'rxjs';

@Component({
  selector: 'app-share-replay',
  templateUrl: './share-replay.component.html',
  styleUrls: ['./share-replay.component.scss']
})
export class ShareReplayComponent implements OnInit {

  url='https://fakestoreapi.com/products';
  allProducts!:Observable<any>;
  Mens!:Observable<any>;
  Women!:Observable<any>;
  jewellery!:Observable<any>;


  constructor(private http:HttpClient) { }

  ngOnInit(): void {

   this.allProducts= this.http.get(this.url).pipe(
    shareReplay()    // avoid multiples http requests using this.
   )
  //  console.log(this.allProducts)

   this.jewellery = this.allProducts.pipe(
    map(res=>res.filter((jewelery:any)=>{
      return jewelery['category'] == 'jewelery'
    }))
   )

   this.Mens = this.allProducts.pipe(
    map(res=>res.filter((mensData:any)=>{
      return mensData['category'] == "men's clothing"
    }))
   )

   this.Women = this.allProducts.pipe(
    map(res=>res.filter((WomenData:any)=>{
      return WomenData['category'] == "women's clothing"
    }))
   )

  }

}
