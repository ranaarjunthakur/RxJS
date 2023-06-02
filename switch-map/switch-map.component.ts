import { Component, OnInit } from '@angular/core';
import { from, map, of, switchAll, switchMap } from 'rxjs';
import { DesignUtilityService } from 'src/app/services/design-utility.service';

@Component({
  selector: 'app-switch-map',
  templateUrl: './switch-map.component.html',
  styleUrls: ['./switch-map.component.scss']
})
export class SwitchMapComponent implements OnInit {

  constructor(private ul: DesignUtilityService) { }

 
  getData(data: any) {
    return of(data + 'Video Uploaded');   // of() operator change data into observable//
  }

  ngOnInit(): void {

    const source = from(['Tech', 'Comedy', 'News']);

    //ex-01 - Map 

    source.pipe(
      map(res=>this.getData(res))
    )
    .subscribe(res=>{
      console.log(res)
      this.ul.print(res,'elContainer')
    })


    //ex-02 - Map + switchAll 

    source.pipe(
      map(res=>this.getData(res)),
      switchAll()
    )
    .subscribe(res=>{
      console.log(res)
      this.ul.print(res,'elContainer2')
    })


    //ex-03 - SwitchMap 
   
    source.pipe(
      switchMap(res=>this.getData(res))
    )
    .subscribe(res=>{
      console.log(res)
      this.ul.print(res,'elContainer3')
    })


  }

}
