import { Component, OnInit, OnDestroy } from '@angular/core';
import { concat, interval, map, merge, take } from 'rxjs';
import { DesignUtilityService } from 'src/app/services/design-utility.service';

@Component({
  selector: 'app-merge',
  templateUrl: './merge.component.html',
  styleUrls: ['./merge.component.scss']
})
export class MergeComponent implements OnInit,OnDestroy {


  finalResult:any

  constructor(private ul:DesignUtilityService) { }


  ngOnInit(): void {
    const sourceTech = interval(3000).pipe(map((val)=>'Tech video #'+(val+1)),take(5));
    const sourceComedy = interval(4000).pipe(map((val)=>' Comdey video #'+(val+1)),take(3));
    const sourceNews = interval(3500).pipe(map((val)=>'News video #'+(val+1)),take(4));


  let finalObs = merge(sourceTech,sourceComedy,sourceNews)

  this.finalResult = finalObs.subscribe((res:any)=>{
      console.log(res)
      this.ul.print(res,'elContainer')
    })
  }

  ngOnDestroy(): void {
   this.finalResult.unsubscribe()
  }

}
