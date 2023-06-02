import { Component, ElementRef, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { map, debounceTime, fromEvent, distinctUntilChanged } from 'rxjs';

@Component({
  selector: 'app-debounce-time',
  templateUrl: './debounce-time.component.html',
  styleUrls: ['./debounce-time.component.scss']
})
export class DebounceTimeComponent implements OnInit, AfterViewInit {

  @ViewChild('myInput') myInput!: ElementRef;
  @ViewChild('myInput2') myInput2!: ElementRef;


  reqData: any;
  reqData2: any;
  sBox: any;

  constructor() { }

  ngOnInit(): void { }

  ngAfterViewInit(): void {

    //TODO:  debounceTime ex-01

    const searchTerm = fromEvent<any>(this.myInput.nativeElement, 'keyup')
      .pipe(map(ev => ev.target.value), debounceTime(1000)
      )

    searchTerm.subscribe((res) => {
      console.log(res)
      this.reqData = res

      setTimeout(() => {
        this.reqData = null
      }, 2000);
    })

    //TODO:  DistinctUntilChanged ex-02


    const searchTerm2 = fromEvent<any>(this.myInput2.nativeElement, 'keyup')
      .pipe(map(ev => ev.target.value), debounceTime(1000), distinctUntilChanged()
      )

    searchTerm2.subscribe((res) => {
      console.log(res)
      this.reqData2 = res

      setTimeout(() => {
        this.reqData2 = null
      }, 2000);
    })


    //TODO:  ex -03 

    // elem ref  
    this.sBox = document.getElementById('search')

    // streams  
    const keyup = fromEvent(this.sBox, 'keyup')

    keyup.pipe(map((res: any) => res.currentTarget.value), debounceTime(1000)).subscribe((res) => {
      console.log(res)
    })


    //TODO:  ex -04 

     // var f = document.createElement("form");
    // f.setAttribute('method', "post");

    // var i = document.createElement("input");
    // i.setAttribute('type', "text");
    // i.setAttribute('name', "username");

    // var s = document.createElement("input");
    // s.setAttribute('type', "submit");
    // s.setAttribute('value', "Submit");

    // f.appendChild(i);
    // f.appendChild(s);

    // document.body.appendChild(f);


    var container = document.createElement('div')
    container.className = 'container';
    var row = document.createElement('div')
    row.className = 'row'
    var col = document.createElement('div')
    col.className = 'col-md-12'
    var div = document.createElement('div');
    div.className = 'form-group';
    var label = document.createElement('label');
    label.className = 'col-sm-2 control-label';
    label.innerHTML = 'search';
    var div1 = document.createElement('div');
    div1.className = 'col-md-12'
    var inputbox = document.createElement('input')
    inputbox.className = 'form-control';
    inputbox.id = 'inputText';
    inputbox.placeholder = 'Search........';


    container.appendChild(row);
    row.appendChild(col)
    col.appendChild(div)
    div.appendChild(label)
    div.appendChild(div1)
    div1.appendChild(inputbox)


    // document.body.appendChild(container)
    
    fromEvent(inputbox, 'input').pipe(debounceTime(1000), map((res: any) => res.target.value)).subscribe((val) => console.log(val))


  }

}
