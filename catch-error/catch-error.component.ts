import { Component, OnInit } from '@angular/core';
import { EMPTY, catchError, throwError } from 'rxjs';
import { DesignUtilityService } from 'src/app/services/design-utility.service';

@Component({
  selector: 'app-catch-error',
  templateUrl: './catch-error.component.html',
  styleUrls: ['./catch-error.component.scss']
})
export class CatchErrorComponent implements OnInit {

title = 'my first Beer';
beers:any=[]=[];


  constructor(private du:DesignUtilityService) { }

  ngOnInit(): void {

    //TODO: using try catch//

    // try {
    //   this.du.getBeers().subscribe((beers) => {
    //     // console.log(beers);
    //     this.beers = beers;
    //     this.title = beers[0].name;
    //   });
    // } catch (err) {
    //   this.title = 'Ups a error';
    // }

    //TODO: catch the error in the subscription

    // this.du
    //   .getBeers()
    //   .subscribe({
    //     next: (beers) => {
    //       // console.log(beers);
    //       this.beers = beers;
    //       this.title = beers[0].name;
    //     },
    //     error: (e) => {
    //       console.log(e);
    //       this.title = 'ups';
    //     },
    //     complete: () => console.log('done'),
    //   });


      //TODO: Using Rxjs Operators catch Error & throw error

      this.du
      .getBeers()
      .pipe(
        catchError(() => {
          return throwError(() => new Error('ups something happened'));
        })

        // catchError(err => err.code === 404 ? throwError("Not found"): throwError(err)
        // )

        // catchError(() => {
        //   return EMPTY;
        // })
      )
      .subscribe({
        next: (beers) => {
          console.log(beers);
          this.beers = beers;
          this.title = beers[0].name;
        },
        error: (err) => {
          console.log(err);
        },
      });
  }


}
