import { AfterViewInit, Component, ElementRef, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { combineLatest, fromEvent, map, pluck, withLatestFrom } from 'rxjs';

@Component({
  selector: 'app-combine-latest',
  templateUrl: './combine-latest.component.html',
  styleUrls: ['./combine-latest.component.scss']
})
export class CombineLatestComponent implements OnInit, AfterViewInit {


  //source 
  nameSource = ['Primary', 'Success', 'Danger', 'Warning', 'Dark', 'Info']
  colorSource = ['blue', 'green', 'red', 'yellow', 'black', 'lightblue']

  //templateRefrence

  @ViewChild('name') name!: ElementRef
  @ViewChild('color') color!: ElementRef

  constructor() { }


  ngOnInit(): void {
  }

  ngAfterViewInit(): void {

    //Observables

    const nameObs = fromEvent<any>(this.name.nativeElement, 'change').pipe(
      // map(res=>res.target.value)
      pluck('target', 'value')
    )


    const colorObs = fromEvent<any>(this.color.nativeElement, 'change').pipe(
      map(res => res.target.value)
    )


    //Ex-01 combineLatest

    combineLatest(nameObs, colorObs).subscribe(([name, color]) => {
      console.log(name, color)
      this.createBox(name, color, 'elContainer')
    })



    //Ex-02  withLatestfrom
    //Master nameObs
    //slave colorObs


    nameObs.pipe(withLatestFrom(colorObs)).subscribe(([name, color]) => {
      console.log(name, color)
      this.createBox(name, color, 'elContainer2')
    })

  }

  createBox(name: any, color: any, containerId: any) {
    let div = document.createElement('div')
    div.innerText = name
    div.setAttribute('class', color)
    document.getElementById(containerId)?.appendChild(div)
  }


}
