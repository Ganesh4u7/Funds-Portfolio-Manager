import { Component, OnInit,OnDestroy } from '@angular/core';
import {Subject} from 'rxjs';
import { HttpService } from '../http.service';

@Component({
  selector: 'app-my-funds',
  templateUrl: './my-funds.component.html',
  styleUrls: ['./my-funds.component.css']
})
export class MyFundsComponent implements OnDestroy,OnInit {

  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  funds:any;
  fundNames:any;

  constructor( private httpService: HttpService) { }

  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
      destroy:true,
      retrieve:true
    };

    this.httpService.onGetPortfolio().subscribe((response)=>{
      if(response){
        this.funds = response;
        this.dtTrigger.next();
      }
    },
    (error)=>{
      console.log(error)
    });

    // this.funds = [
    //   {company:'axis',asset:30,share:30},
    //   {company:"hdfc",asset:20,share:15}
    // ]
  }
  ngOnDestroy(): void{
    this.dtTrigger.unsubscribe();
  }

  onFundNames(index){

    this.httpService.onGetFundsNames(this.funds[index].company).subscribe((response)=>{
      if(response){
        this.fundNames = response;
      }
    },
    (error)=>{
      console.log(error)
    });
  }

}
