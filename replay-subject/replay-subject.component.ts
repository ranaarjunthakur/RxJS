import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { DesignUtilityService } from 'src/app/services/design-utility.service';

@Component({
  selector: 'app-replay-subject',
  templateUrl: './replay-subject.component.html',
  styleUrls: ['./replay-subject.component.scss']
})
export class ReplaySubjectComponent implements OnInit {

  //list Data

  user1List:any=[
    'Angular1',
    'Angular2'
  ]
  user2List:any=[]
  user3List:any=[]

  //SubscribeModes

  subscribeMode2:boolean=false
  subscribeMode3:boolean=false


  //Subscriptions

  subscription2:any = Subscription;
  subscription3:any = Subscription;




  constructor( private du:DesignUtilityService) { }

  ngOnInit(): void {
    this.du.videoEmit.subscribe((res)=>{
      console.log(res)
      this.user1List.push(res)
    })
  }

  getVal(inpVal:any){
    // console.log(inpVal)
    // this.user1List.push(inpVal)
    this.du.videoEmit.next(inpVal)
  }


  user2Subscribe(){
    if(this.subscribeMode2){
      this.subscription2.unsubscribe()
    }else{
      this.subscription2 = this.du.videoEmit.subscribe((res)=>{
        this.user2List.push(res)
      })
    }
    this.subscribeMode2 =  !this.subscribeMode2
  }

  user3Subscribe(){
    if(this.subscribeMode3){
      this.subscription3.unsubscribe()
    }else{
      this.subscription3 = this.du.videoEmit.subscribe((res)=>{
        this.user3List.push(res)
      })
    }
    this.subscribeMode3 =  !this.subscribeMode3

  }
}
