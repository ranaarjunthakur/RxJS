import { Component, OnInit } from '@angular/core';
import { filter, interval, map, of, tap, Subscription } from 'rxjs';
import { DesignUtilityService } from 'src/app/services/design-utility.service';

@Component({
  selector: 'app-tap',
  templateUrl: './tap.component.html',
  styleUrls: ['./tap.component.scss']
})
export class TapComponent implements OnInit {

   obsSub: any;

  constructor(private ul: DesignUtilityService) { }

  ngOnInit(): void {

    //TODO: Example 01

  

    const arr = ['arjun', 'vinay', 'akash', 'vikrant', 'uday', 'jayant']

    const source = interval(1000)

    this.obsSub = source.pipe(
      tap(res=>{
        console.log('tap before', +res)
        if(res==6){
          this.obsSub.unsubscribe()
        }
      }),
      map((res)=>arr[res]),
      tap(res=>console.log('tap After',+res))
    ).subscribe(res=>{
      console.log(res);
      this.ul.print(res,'elContainer')
    })

 //TODO: example 2

    let list1 = of(1, 2, 3, 4, 5, 6);
    let final_val = list1.pipe(
      tap(x => console.log("From tap() =" + x),
        e => console.log(e),
        () => console.log("Task completed")),
      filter(a => a % 2 === 0)
    );
    final_val.subscribe(x => console.log("The even number is=" + x));
  }

}
