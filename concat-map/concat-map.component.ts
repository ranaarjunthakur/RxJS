import { Component, OnInit } from '@angular/core';
import { concatAll, concatMap, from, map, of } from 'rxjs';
import { DesignUtilityService } from 'src/app/services/design-utility.service';

@Component({
  selector: 'app-concat-map',
  templateUrl: './concat-map.component.html',
  styleUrls: ['./concat-map.component.scss']
})
export class ConcatMapComponent implements OnInit {

  constructor(private du:DesignUtilityService) { }

  getData(data:any){
   return of(data + 'Video Uploded')
  }

  ngOnInit(): void {
    const source = from(['Tech',"comedy","News"])

    //Ex-01 Map   

    source.pipe(
      map(res=>this.getData(res))
    )
    .subscribe(res=>{
      console.log(res)  // we have a observable if we want to get data we can re subscribe but we use concatmap for getting a data//
      this.du.print(res,'elContainer')
    })


     //Ex-02 Map   + ConcatAll

     source.pipe(
      map(res=>this.getData(res)),
      concatAll()
    )
    .subscribe(res=>{
      console.log(res)  // we can get data using map & concat All operators.//
      this.du.print(res,'elContainer2')
    })

      //Ex-02  concatMap

      source.pipe(
        concatMap(res=>this.getData(res)),
       
      )
      .subscribe(res=>{
        console.log(res)  // we can get data using concatMap operators.//
        this.du.print(res,'elContainer3')
      })
  

  }

}
