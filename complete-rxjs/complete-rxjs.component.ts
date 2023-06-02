import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Observable, concatMap, debounceTime, distinctUntilChanged, filter, forkJoin, from, fromEvent, interval, map, merge, mergeMap, of, retry, switchMap, take, tap, toArray} from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-complete-rxjs',
  templateUrl: './complete-rxjs.component.html',
  styleUrls: ['./complete-rxjs.component.scss']
})
export class CompleteRxjsComponent implements OnInit,AfterViewInit {

  @ViewChild('timezoneSearch') timezoneSearch!:ElementRef

   readBooks = [
    { bookId: 1, title: 'Clean code', auther: 'Robert Cecil Martin' },
    { bookId: 1, title: 'First rate of madness', auther: 'Nassir Ghaemi' },
    { bookId: 2, title: 'The acheivement habits', auther: ' Bernard Roth' },
    { bookId: 3, title: 'Conscious Capitalism', author: 'John Mackey and Rajendra Sisodia'},
    { bookId: 3, title: 'The richest man in Babylon', author: 'George Samuel Clason'},
    { bookId: 3, title: 'Rich dad poor dad', author: 'Robert Kiyosaki and Sharon Lechter'},
  ];

  obj:any={
    name:'Angular',
    language:'JavaScript',
    developed_by:'Google'
  }


  constructor(private http:HttpClient){
    this.loadUsers();
    this.concatMap()
  }


  ngOnInit(): void {
     let  Books = of(this.readBooks)
       Books.subscribe((res)=>{
        console.log(res)
       })

       let  Books2 = from(this.readBooks)
       Books2.subscribe((res)=>{
        console.log(res)
       })

       const fromString$ = from("Hello");
      fromString$.subscribe((value) => console.log(`Emitted Values: `, value));


      const fromArr= from(this.readBooks)
      fromArr.pipe(
        take(2),
        map((val)=>val.bookId+100)
      ).subscribe((res)=>{
        console.log('map value',res)
      })



      const obs1 = Observable.create((val:any)=>{
        val.next('Value 1')
      })

      const obs2 =  Observable.create((val:any)=>{
        val.next('Value 2')
      })

      const obs3 =  Observable.create((val:any)=>{
        val.next('Value 3')
      })


      const mergeObservable = merge(obs1,obs2,obs3)
      mergeObservable.subscribe((res)=>{
        console.log(res)
      })


      from([
        { brand: 'iPhone', model: 'Xmax', price: '$1000' },
        { brand: 'Samsung', model: 'S10', price: '$850' }
      ]).pipe(
        filter((val)=>val.model== 'Xmax')
      ).subscribe((res)=>{
        console.log('filter Value',res)
      })


      let  observable1 = of(1,2,3,)
      let  observable2 = of(8,9,11)

      observable1.pipe(
        mergeMap(val=>observable2.pipe(map(val2=>val+""+val2)))
      ).subscribe((res)=>{
        console.log(res)
      })


      const source = interval(1000).pipe(
        take(5),   //  take only 5 values
        toArray()   // convert an Arrya
      ).subscribe((res)=>{
        console.log(res)
      })


      // retry()

      const numbers = of(1,2,3,4,5,124,12,'a')
      const mappedNumber= numbers.pipe(
        map((val:any)=>val*2),
        tap(val=>console.log(`Processing ${val}...`)),
        retry(2)
      )

      mappedNumber.subscribe(
        value => console.log(`Result: ${value}`),
        error => console.log(`Error: ${error}`)
      );

  }



  ngAfterViewInit(): void {
    fromEvent(this.timezoneSearch.nativeElement,'keyup').pipe(
      debounceTime(500),       // waiting for user to stop typing //
      distinctUntilChanged(),   // only emit when the value change //
      switchMap((event:any)=> {
        return this.http.get<any>('https://jsonplaceholder.typicode.com/posts'+'?q='+event.target.value)
      })
    ).subscribe((res)=>{
      console.log('Data found ',res)
    })

  }


  loadUsers(){
       let req1= this.http.get('https://jsonplaceholder.typicode.com/todos')
       let req2 = this.http.get('https://jsonplaceholder.typicode.com/users')

       forkJoin(req1,req2).subscribe((res)=>{
        try {
          console.log(res)
        } catch (error) {
          console.log(error)
        }
       
       })
  }


  concatMap(){
    const req = from([1,2,3]).pipe(
      concatMap(x=>this.http.get('https://jsonplaceholder.typicode.com/posts/'+x))
    )

    req.subscribe((res)=>{
      console.log(res)
    })
  }




}
