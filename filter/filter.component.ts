import { Component, OnInit } from '@angular/core';
import { filter, from, toArray } from 'rxjs';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent implements OnInit {

  data:any;
  data2:any
  data3:any
  source = from([
    { id: '1', name: 'Alex', age: 32, gender: 'male' },
    { id: '2', name: 'Akira', age: 25, gender: 'male' },
    { id: '3', name: 'Aisha', age: 23, gender: 'female' },
    { id: '4', name: 'Anisha', age: 16, gender: 'female' },
    { id: '5', name: 'Anisha', age: 19, gender: 'female' },
    { id: '6', name: 'Alisha', age: 22, gender: 'female' }
  ]);
 

  constructor() { }

  ngOnInit(): void {

   

    //TODO: example 01 filter by  length

    const source =   this.source.pipe( filter(mem => mem.name.length>5), toArray()).subscribe((val)=>{
      console.log(val);
      this.data=val;
     })

      //TODO: example 01 filter by gender

    const source2 = this.source.pipe( filter(res=>res.gender=='female'), toArray()).subscribe((val)=>{
      console.log(val);
      this.data2=val;
     })


        //TODO: example 01 filter by nth item

    const source3 = this.source.pipe( filter((res:any)=>res.id <= 3), toArray()).subscribe((val)=>{
      console.log(val);
      this.data3=val;
     })

  }

}
