import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { DesignUtilityService } from 'src/app/services/design-utility.service';

@Component({
  selector: 'app-async-subject',
  templateUrl: './async-subject.component.html',
  styleUrls: ['./async-subject.component.scss']
})
export class AsyncSubjectComponent implements OnInit {

AsyncVideoEmit:any;

  constructor( private du:DesignUtilityService) { }

  ngOnInit(): void {
    this.du.asyncVideoEmit.subscribe((res)=>{
      console.log(res)
      this.AsyncVideoEmit=res
    })
   
  }


  //  video add method 

  getVal(inpVal:any){
    console.log(inpVal)
    // this.du.videoEmit.next(inpVal)
    this.du.asyncVideoEmit.next(inpVal)
  }



//on complete Method 


  onComplete(){
   this.du.asyncVideoEmit.complete()
  }

}
