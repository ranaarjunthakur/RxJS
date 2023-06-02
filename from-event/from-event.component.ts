import { Component, OnInit, ElementRef, ViewChild, AfterViewInit,OnDestroy } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { Observable, debounceTime, fromEvent, tap } from 'rxjs';
import { DesignUtilityService } from 'src/app/services/design-utility.service';

@Component({
  selector: 'app-from-event',
  templateUrl: './from-event.component.html',
  styleUrls: ['./from-event.component.scss']
})
export class FromEventComponent implements OnInit , AfterViewInit,OnDestroy {

  myBtnClicks!: Observable<any>;

 @ViewChild('addBtn') addBtn!:ElementRef;
 @ViewChild('btnTemplateName') myBtn!: MatButton;
 @ViewChild('name', { static: true }) name!: ElementRef;

  constructor(private UtlityService:DesignUtilityService,private elm: ElementRef) { }

  ngAfterViewInit(): void {
    let count =1
    fromEvent(this.addBtn.nativeElement,'click').subscribe(res=>{
      let countVal = 'video' + count++
      console.log(countVal);
      this.UtlityService.print(countVal,'elContainer2')
      this.UtlityService.print(countVal,'elContainer')
    })  
    this.buttonClick();
  }

  ngOnInit(): void {
   
  }

  buttonClick() {
    fromEvent(this.myBtn._elementRef.nativeElement, 'click').subscribe(res=>{
      console.log(res,"Button clicked");
    })
  }
 

  ngOnDestroy() {
    // this.myBtnClicks.unsubscribe()
  }


  // print(val:any,containerId:any){
  //   let el = document.createElement('li')
  //   el.innerText = val;
  //   document.getElementById(containerId)?.appendChild(el)
  // }



}
