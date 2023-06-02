import { Component, OnInit } from '@angular/core';
import { Subscription, from, interval, of, take, toArray } from 'rxjs';

@Component({
  selector: 'app-to-array',
  templateUrl: './to-array.component.html',
  styleUrls: ['./to-array.component.scss']
})
export class ToArrayComponent implements OnInit {

  products: Array<object> = [
    { name: 'Product 001' },
    { name: 'Product 002' },
    { name: 'Product 003' },
    { name: 'Product 004' },
    { name: 'Product 005' }
  ];

  sourceSub: any

  constructor() { }

  ngOnInit(): void {

    //TODO: example 1

    const source = interval(1000)

    this.sourceSub = source.pipe(
      take(5),
      toArray()
    )
      .subscribe((res => {
        console.log(res)

        // if(res>=8){
        //   this.sourceSub.unsubscribe()
        // }

      }))

    //TODO: example 2

    // const source2= interval(1000)

    const source2 = from(this.products).pipe(toArray()).subscribe((res) => {
      console.log(res)
    })


    //TODO: example 3
 
    let source3 = of('arjun','pratap','raana').pipe(toArray()).subscribe((res)=>{
      console.log(res);
      
    })



  }

}
