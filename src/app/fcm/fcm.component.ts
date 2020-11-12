import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit,OnDestroy, AfterViewInit } from '@angular/core';
import {Subject} from 'rxjs';
import { HttpService } from '../http.service';

@Component({
  selector: 'app-fcm',
  templateUrl: './fcm.component.html',
  styleUrls: ['./fcm.component.css']
})
export class FcmComponent implements OnDestroy,OnInit,AfterViewInit {

  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  funds:any;
  selectedFund:any;

  constructor( private httpService: HttpService) { }

  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
      destroy:true,
      retrieve:true
    };

    this.httpService.onGetFundComparison().subscribe((response)=>{
      if(response){
        this.funds = response;
        // this.dtTrigger.next();
      }
    },
    (error)=>{
      console.log(error)
    })

    // this.funds = [
    //   {fund1:'axis',fund2:"hdfc",stocks:2,overlap:30},
    //   {fund1:"hdfc",fund2:"axis",stocks:2,overlap:30}
    // ]
  }
  ngAfterViewInit(): void {this.dtTrigger.next();}

  ngOnDestroy(): void{
    this.dtTrigger.unsubscribe();
  }

  onFundComparison(index){
    let name1 = this.funds[index].fund1;
    let name2 = this.funds[index].fund2;

    this.httpService.onGetFundCompareOne(name1,name2).subscribe((response)=>{
      if(response){
        this.selectedFund = response;
        this.dtTrigger.next();
      }
    },
    (error)=>{
      console.log(error);
    });
  }
}
