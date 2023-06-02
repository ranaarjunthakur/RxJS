import { Component, OnInit } from '@angular/core';
import { concat, interval, map, take } from 'rxjs';
import { DesignUtilityService } from 'src/app/services/design-utility.service';

@Component({
  selector: 'app-concat',
  templateUrl: './concat.component.html',
  styleUrls: ['./concat.component.scss']
})
export class ConcatComponent implements OnInit {

  constructor(private ul:DesignUtilityService) { }

  ngOnInit(): void {
    const sourceTech = interval(1000).pipe(map((val)=>'Tech video #'+(val+1)),take(5));
    const sourceComedy = interval(1000).pipe(map((val)=>' Comdey video #'+(val+1)),take(3));
    const sourceNews = interval(1000).pipe(map((val)=>'News video #'+(val+1)),take(4));


  const finalObs = concat(sourceTech,sourceComedy,sourceNews)

  finalObs.subscribe((res)=>{
      console.log(res)
      this.ul.print(res,'elContainer')
    })
  }

}
