import { Component, OnInit } from '@angular/core';
import { of, mergeMap,  delay, concatMap, from } from 'rxjs';
import { DesignUtilityService } from 'src/app/services/design-utility.service';

@Component({
  selector: 'app-concat-map2',
  templateUrl: './concat-map2.component.html',
  styleUrls: ['./concat-map2.component.scss']
})
export class ConcatMap2Component implements OnInit {

  notifyData =[
    {
      message:'iMessage',
      icon:'far fa-comment',
      time:'Sun 1:10 pm',
      strong:'Nathan D',
      divMainContent:'Yeah, thats sound with me. I will see you in 10'
    },
    {
      message:'iMessage',
      icon:'fab fa-facebook',
      time:'Sun 1:23 pm',
      strong:'Em',
      divMainContent:'Your friend Ethan mentioned you in a comment.'
    },
    {
      message:'iMessage',
      icon:'fab fa-whatsapp',
      time:'Sun 1:40 pm',
      strong:'Notification',
      divMainContent:'Okay xx.'
    },
    {
      message:'iMessage',
      icon:'far fa-newspaper',
      time:'Sun 1:50 pm',
      strong:'Breaking News',
      divMainContent:' An explosion in London has left over 20 people fighting for their lives.'
    }
  ]

  constructor(private ul: DesignUtilityService) { }

  ngOnInit(): void {

   from(this.notifyData).pipe(
    // mergeMap(res=>this.getHTML(res))
    concatMap(res=>this.getHTML(res))
   )
   .subscribe(res=>{
    console.log(res);
    this.ul.notification(res, 'dialog-container')
   })
  }


  getHTML(data:any){
    return of(`<div id="dialog-container">
    <div class="dialog-box">
    <div class="background-blur"></div>
    <div class="header">
      <div class="background-blur"></div>
      <div class="contents">
      <div class="left">
        <i class="${data.icon}"></i>${data.message}
      </div>
      <div class="right">
      ${data.time}
      </div>
      </div>
    </div>
    <div class="contents main-content">
      <strong>
      ${data.strong}
      </strong>
      <br/>
      ${data.divMainContent}
    </div>
  </div>
  </div>`).pipe(delay(2000))
  }

}
