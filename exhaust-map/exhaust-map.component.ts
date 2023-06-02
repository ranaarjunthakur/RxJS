import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable, Subject, concatMap, exhaustMap, filter, fromEvent, tap } from 'rxjs';
import { DesignUtilityService } from 'src/app/services/design-utility.service';

@Component({
  selector: 'app-exhaust-map',
  templateUrl: './exhaust-map.component.html',
  styleUrls: ['./exhaust-map.component.scss']
})
export class ExhaustMapComponent implements OnInit,AfterViewInit {

  UpdateForm!: FormGroup 
  submitted = false;
  btnSub$: Subject<boolean> = new Subject();

  num=0
  fetching:boolean=false;
  url='https://fakestoreapi.com/products/1'
  saveRequest:any

  @ViewChild('addBtn') addBtn!:ElementRef

  constructor(
    private Elref:ElementRef,
    private http:HttpClient,
    private du:DesignUtilityService
    ) {
      this.UpdateForm = new FormGroup({
        title: new FormControl('', Validators.required),
        body: new FormControl('', Validators.required),
        userId: new FormControl('', Validators.required)
      });
     }


  ngOnInit(): void {
    this.onSubmit();
  }

  onSubmit(): void {
    this.btnSub$.pipe(
      tap(() => this.submitted = true),
      filter(() => this.UpdateForm.valid),
      exhaustMap(() => this.saveRecord(this.UpdateForm.value))
    ).subscribe(data => {
      console.log('saved notification => ', data);
      this.submitted = false;
    });
  }

  saveRecord(formVal:any): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
      })
    };
    return this.http.post(
      `https://jsonplaceholder.typicode.com/posts`,
      JSON.stringify(formVal),
      httpOptions
    );
  }

  ////////////////////////////////////////////////////////////

  ngAfterViewInit(): void {
    fromEvent(this.addBtn.nativeElement,'click').pipe(
      tap(()=>this.fetching=true),
      // concatMap(()=>this.onSave(this.num++))
      exhaustMap(()=>this.onSave(this.num++))
    )
    .subscribe((res)=>{
      console.log(res)
      this.onFetch()
      this.fetching=false
    })
  }

  onSave(changes:any){
    return this.http.put(this.url,{data:changes})
  }

  onFetch(){
    this.http.get<any>(this.url).subscribe((res)=>{
      console.log(res.id)
      this.saveRequest =res.id
    })
  }




}
