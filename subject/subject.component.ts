import { Component, OnInit, OnDestroy } from '@angular/core';
import { DesignUtilityService } from 'src/app/services/design-utility.service';

@Component({
  selector: 'app-subject',
  templateUrl: './subject.component.html',
  styleUrls: ['./subject.component.scss']
})
export class SubjectComponent implements OnInit,OnDestroy {

  UserName:any;

  constructor(private ul:DesignUtilityService) { 
    this.ul.userName.subscribe((res)=>{
      this.UserName = res;
    })
  }

  ngOnInit(): void {
    this.ul.exclusive.next(true)
  }

  ngOnDestroy(): void {
    this.ul.exclusive.next(false)
  }

}
