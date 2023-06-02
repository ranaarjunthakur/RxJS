import { Component, OnInit } from '@angular/core';
import { from, of } from 'rxjs';
import { DesignUtilityService } from 'src/app/services/design-utility.service';

@Component({
  selector: 'app-of-from',
  templateUrl: './of-from.component.html',
  styleUrls: ['./of-from.component.scss']
})
export class OfFromComponent implements OnInit {


  products: Array<object> = [
    { name: 'Product 001'},
    { name: 'Product 002'},
    { name: 'Product 003'},
    { name: 'Product 004'},
    { name: 'Product 005'}
  ];

  constructor( private ultityservice:DesignUtilityService) { }

  ngOnInit(): void {

    //TODO: of operator

    of(this.products).subscribe(
      next=> console.log(next),
      error => console.log(error),
      ()=> console.log('Completed')
    )

    const obs1 = of('Arjun',"Pratap","Rana");
    obs1.subscribe((res)=>{
      console.log(res);
      this.ultityservice.print(res,'elContainer')
    })



    //TODO: from() example using Array

    const obs = from(['Angular',"Developer","India"]);

    obs.subscribe((res)=>{
      console.log(res);
      this.ultityservice.print(res,'elContainer2')
    })


    //TODO:  FROM OPERATOR ON PROMISE  

      const promise = new Promise((resolve, reject) =>{
        setTimeout(()=>{
          resolve('Promise Resolved')
        },3000)
      })

      promise.then((res) =>{
        console.log(res)
      })

      const obs2 = from(promise);

      obs2.subscribe((res)=>{
        console.log('prommise=>',res);
        this.ultityservice.print(res,'elContainer3')
      })

          //TODO:  FROM OPERATOR  ON STRING
 

          let str = 'hey how are you'

          const obs3 = from(str);

          obs3.subscribe((res)=>{
            console.log('prommise=>',res);
            this.ultityservice.print(res,'elContainer4')
          })
  }


 

}
