import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, observable } from 'rxjs';
import { DesignUtilityService } from 'src/app/services/design-utility.service';

@Component({
  selector: 'app-custom-observable',
  templateUrl: './custom-observable.component.html',
  styleUrls: ['./custom-observable.component.scss']
})
export class CustomObservableComponent implements OnInit, OnDestroy {

  techStatus: any;
  techStatus2: any;
  nameStatus: any;
  names: any;
  subs2: any;

  constructor(private DesignUtility: DesignUtilityService) { }


  ngOnInit(): void {

    //TODO: ex-01 manual 

    const cusObs1 = Observable.create((observer: any) => {
      setTimeout(() => {
        observer.next('Angular')
      }, 1000);
      setTimeout(() => {
        observer.next('Javascript')
      }, 2000);
      setTimeout(() => {
        observer.next('Typescript')
      }, 3000);
      setTimeout(() => {
        observer.next('jQuery')
        observer.error(new Error('limit Exceed'))

      }, 4000);
      setTimeout(() => {
        observer.next('css')
        observer.complete()
      }, 5000);
    })

    cusObs1.subscribe((res: any) => {
      // console.log(res);
      this.DesignUtility.print(res, 'elContainer')
    }, (err: any) => {
      this.techStatus = 'error'
    },
      () => {
        this.techStatus = 'completed'
      }
    )


    //TODO: ex-02 custom Interval 

    const Arr = ['Angular', 'javascript', 'typescript', 'jquery', 'css']

    const cusObs2 = Observable.create((observer: any) => {
      let count = 0;
      setInterval(() => {
        observer.next(Arr[count])
        if (count >= 3) {
          observer.error('error emit')
        }
        if (count >= 5) {
          observer.complete()
        }
        count++
      }, 2000)
    })

    this.subs2 = cusObs2.subscribe((res: any) => {
      // console.log(res)
      this.DesignUtility.print(res, 'elContainer2')
    }, (err: any) => {
      this.techStatus2 = 'error'
    },
      () => {
        this.techStatus2 = 'completed'
      }
    )

    // TODO: cutom observable 2.0

    const customIntervalObservable = Observable.create((observer: any) => {
      let count = 0;
      setInterval(() => {
        observer.next(count)
        if (count > 5) {
          observer.error(new Error("count is greater than 5"))
        }
        count++
      }, 1000)

    })

    customIntervalObservable.subscribe((res: any) => {
      console.log(res)
    }, (error: any) => {
      alert(error.message)
    }, () => {
      console.log("Completed!!")
    }
    )


    //TODO: ex-02 custom Names 

    const Arr2 = ["cat", "goat", "dog", "tiger", 'camel', 'elephant']

    const cusObs3 = Observable.create((observer: any) => {
      let count = 0;
      setInterval(() => {
        observer.next(Arr2[count])
        if (count >= 2) {
          // observer.error('error emit')
        }
        if (count >= 4) {
          observer.complete()
        }
        count++
      }, 2000)
    })

    cusObs3.subscribe((res: any) => {
      // console.log(res)
      this.names = res
    }, (err: any) => {
      this.nameStatus = 'error'
    },
      () => {
        this.nameStatus = 'completed'
      }
    )

  }

  //TODO:  when we go  another route then this data go to  unsubscribe()

  ngOnDestroy(): void {
    this.subs2.unsubscribe()
  }

}
