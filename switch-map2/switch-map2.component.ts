import { Component, ElementRef, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { FormControl, NgForm } from '@angular/forms';
import { Observable, concatMap, debounce, debounceTime, distinctUntilChanged, filter, map, pluck, switchMap } from 'rxjs';
import { DesignUtilityService } from 'src/app/services/design-utility.service';

@Component({
  selector: 'app-switch-map2',
  templateUrl: './switch-map2.component.html',
  styleUrls: ['./switch-map2.component.scss']
})
export class SwitchMap2Component implements OnInit,AfterViewInit {

  @ViewChild('searchForm') searchForm!:NgForm ;
  searchResults:any
  searchResultCount:any

  //country search 

  filteredVaules: Observable<string[]> | undefined;
  countryControl: FormControl = new FormControl();


  constructor(private du:DesignUtilityService) { }
 
  ngOnInit(): void {

    // country search //

    this.countryControl.valueChanges.pipe(debounceTime(500)).subscribe(val => {
      console.log(val);
      this.filteredVaules = this.du.GetFilteredCountries(val);
    });

  }

  ngAfterViewInit(): void {

    const formValue = this.searchForm.valueChanges;
    formValue?.pipe(
      // map(res=>res.searchTerm)
      filter(():any=>this.searchForm.valid),
      pluck('searchTerm'),
      debounceTime(500),
      distinctUntilChanged(),
      switchMap(data=>this.du.getSearches(data))
    )
    .subscribe((value: string)=>{
      console.log(value)
      this.searchResults=value
      // console.log(Object.keys(value).length)
      this.searchResultCount= Object.keys(value).length
    })
  }
}
