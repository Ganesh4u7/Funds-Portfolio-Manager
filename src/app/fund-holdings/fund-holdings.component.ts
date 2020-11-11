import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-fund-holdings',
  templateUrl: './fund-holdings.component.html',
  styleUrls: ['./fund-holdings.component.css']
})
export class FundHoldingsComponent implements OnInit {

  dtOptions: DataTables.Settings = {};
  funds:any;

  constructor() { }

  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers'
    };

    this.funds = [
      {company:'axis',asset:30,share:30},
      {company:"hdfc",asset:20,share:15}
    ]
  }

}
