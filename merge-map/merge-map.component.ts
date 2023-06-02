import { Component, OnInit } from '@angular/core';
import { from, map, mergeAll, mergeMap, of } from 'rxjs';
import { DesignUtilityService } from 'src/app/services/design-utility.service';

@Component({
  selector: 'app-merge-map',
  templateUrl: './merge-map.component.html',
  styleUrls: ['./merge-map.component.scss']
})
export class MergeMapComponent implements OnInit {

  constructor(private ul: DesignUtilityService) { }

  getData(data: any) {
    return of(data + 'Video Uploaded');   // of() operator change data into observable//
  }

  ngOnInit(): void {
    const source = from(['Tech', 'Comedy', 'News']);

    //ex-01 Map 

    source.pipe(
      map(res => this.getData(res))
    )
      .subscribe((res => {        // for getting a data subscribe a two times then we can get data //
        console.log(res)
        this.ul.print(res, 'elContainer')
      }))


    //ex-02 Map  + mergeAll 

    source.pipe(
      map(res => this.getData(res)),
      mergeAll()
    )
      .subscribe((res => {        // for getting a data subscribe a two times then we can get data //
        console.log(res)
        this.ul.print(res, 'elContainer2')
      }))

    //ex-03 MergeMap 

    source.pipe(
      mergeMap(res => this.getData(res)),
   
    )
      .subscribe((res => {        // for getting a data subscribe a two times then we can get data //
        console.log(res)
        this.ul.print(res, 'elContainer3')
      }))

  }

}
