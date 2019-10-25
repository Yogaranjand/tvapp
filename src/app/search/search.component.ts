import { Component, OnInit } from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {SearchService} from './search.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.less']
})
export class SearchComponent implements OnInit {
  resultData:any;
  currentUrl = '';
  constructor(private translate: TranslateService, 
    private router: Router, 
    private serach: SearchService) {}

  ngOnInit() {
  }
  getSearchResult() {
    console.log('hello ======');
    this.serach.fetch('https://napi.busbud.com/x-departures/dr5reg/f25dvk/2019-10-25').subscribe((res: any) => {
      console.log('res ======', JSON.stringify(res));
      this.resultData = res;
    });
  }

}
