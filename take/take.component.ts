import { Component, OnInit } from '@angular/core';
import { from, fromEvent, interval, map, take, takeLast, takeUntil, timer } from 'rxjs';
import { DesignUtilityService } from 'src/app/services/design-utility.service';

@Component({
  selector: 'app-take',
  templateUrl: './take.component.html',
  styleUrls: ['./take.component.scss']
})
export class TakeComponent implements OnInit {

  randomNAmes= ['arjun', 'vinay', 'akash', 'vikrant', 'uday', 'jayant']

  constructor( private ul:DesignUtilityService) { }

  ngOnInit(): void {

    const nameSource = from(this.randomNAmes)

    //TODO: Ex-01 take

    nameSource.pipe(take(3)).subscribe((res:any)=>{
      console.log(res)
      this.ul.print(res,'elContainer')
     })

      //TODO: Ex-02 takeLast

    nameSource.pipe(takeLast(3)).subscribe((res:any)=>{
      console.log(res)
      this.ul.print(res,'elContainer1')
     })

      //TODO: Ex-01 takeUntil

      const source = interval(1000)
      let condition1 = timer(5000);
      let condition2 = fromEvent(document,'click')

      source.pipe(map(res=>'Number'+ res),  takeUntil(condition2)).subscribe((res:any)=>{
      console.log(res)
      this.ul.print(res,'elContainer2')
     })
  }

}
