import { Component, OnInit } from '@angular/core';
import { from, map, pluck, toArray } from 'rxjs';

@Component({
  selector: 'app-pluck',
  templateUrl: './pluck.component.html',
  styleUrls: ['./pluck.component.scss']
})
export class PluckComponent implements OnInit {

  data: any;
  data2:any;

  source = [
    {
      name: 'Alex',
      age: 31,
      job: {
        title: 'web Designer',
        exp: '4 Years'
      }
    },
    {
      name: 'Adam', age: 28,
      job: {
        title: 'web Developer',
        exp: '3 Years'
      }
    },
    {
      name: 'Alia', age: 21,
      job: {
        title: 'react Developer',
        exp: '2 Years'
      }
    },
    {
      name: 'David', age: 35,
      job: {
        title: 'freelancer',
        exp: '8 Years'
      }
    },
    {
      name: 'Rhea', age: 28,
      job: {
        title: 'Singer',
        exp: '4 Years'
      }
    },
    {
      name: 'Samson', age: 31,
      job: {
        title: 'Cricketer',
        exp: '8 Years'
      }
    },
    {
      name: 'Dhoni', age: 31,
      job: {
        title: 'Captain',
        exp: '14 Years'
      }
    }
  ];

  constructor() { }

  ngOnInit(): void {

    //TODO: example 01

    from(this.source).pipe(
      // map((res) => res.name),
      pluck('name'),
      toArray())
      .subscribe((res) => {
        console.log(res);
        this.data = res
      })

      //TODO: example 02

    from(this.source).pipe(
      // map((res) => res.name),
      pluck('job','title'),
      toArray())
      .subscribe((res) => {
        console.log(res);
        this.data2 = res
      })


  }

}
