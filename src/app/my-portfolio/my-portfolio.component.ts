import { AfterViewInit, Component, OnDestroy,OnInit } from '@angular/core';
import {FormsModule,ReactiveFormsModule} from '@angular/forms';
import {FormControl, FormGroup,NgForm} from '@angular/forms';
import {Subject} from 'rxjs';
import { HttpService } from '../http.service';

@Component({
  selector: 'app-my-portfolio',
  templateUrl: './my-portfolio.component.html',
  styleUrls: ['./my-portfolio.component.css']
})
export class MyPortfolioComponent implements OnDestroy,OnInit,AfterViewInit { 
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  addFundForm :FormGroup;
  editFundForm : FormGroup;
  editNo:number;
  funds : any;
  fundHolding:any;
  fundUpdateStatus = null;
  refreshing = false;

  constructor( private httpService: HttpService) { }

  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
      destroy:true,
      retrieve:true
    };

    this.addFundForm =  new FormGroup({
      name: new FormControl(null),
      value: new FormControl(null),
      category:new FormControl(null),
      mcUrl: new FormControl(null)
    });

    this.editFundForm =  new FormGroup({
      name: new FormControl(null),
      value: new FormControl(null),
      category: new FormControl(null),
      mcUrl: new FormControl(null)
    });

    this.httpService.onGetFunds().subscribe((response)=>{
      if(response){
        this.funds = response;
          //  this.dtTrigger.next();
      }
    },
    (error)=>{
      console.log(error)
    });

    //  this.funds = [{sno:1,name:"blue-chip",category:"something",value:100,mcUrl:"Some Url"},{sno:2,name:"hdfc",category:"someother thing",value:33,mcUrl:"Some other url"}];
  }
  ngAfterViewInit(): void {this.dtTrigger.next();}

  ngOnDestroy(): void{
    this.dtTrigger.unsubscribe();
  }

  onEditNo(index){
    this.editNo =index;
    console.log(this.editNo);
  }

  onAddFund(){
    this.httpService.onUpdateFund(this.addFundForm.value).subscribe((response)=>{
    console.log(response);
    this.httpService.onGetFunds().subscribe((response)=>{
      if(response){
        this.funds = response;
        this.addFundForm.reset();
          this.dtTrigger.next();
      }
    },
    (error)=>{
      console.log(error)
    });
    },
    (error)=>{
      console.log(error)
    });


  }
  onEditFund(){
    this.httpService.onUpdateFund(this.editFundForm.value).subscribe((response)=>{
    console.log(response);
    this.httpService.onGetFunds().subscribe((response)=>{
      if(response){
        this.funds = response;
        this.editFundForm.reset();
          this.dtTrigger.next();
      }
    },
    (error)=>{
      console.log(error)
    });
    },
    (error)=>{
      console.log(error)
    });


  }

  onDelete(index){
    if(confirm(`Are you sure you want to Delete ${this.funds[index].name}?`)){
      console.log('Delete hitted');
      this.httpService.onDeleteFund(this.funds[index].name).subscribe((response)=>{
      console.log(response);
      this.httpService.onGetFunds().subscribe((response)=>{
        if(response){
          this.funds = response;
            this.dtTrigger.next();
        }
      },
      (error)=>{
        console.log(error)
      });
      },
      (error)=>{
        console.log(error)
      });
    }

  }

  onGetFundHolding(index){

    this.httpService.onGetHolding(this.funds[index].name).subscribe(
      (response) => {
        if(response){
          // this.dtOptions.destroy();
          this.fundHolding = response;

          this.dtTrigger.next();
        }
      },
      (error) => console.log(error)
    );
  }

  goToLink(url: string){
    window.open(url,"_blank");
    console.log(url)
  }

  onRefresh(){
    this.refreshing = true;
    this.httpService.onRefreshPortfolio().subscribe(
      (response) => {
        this.refreshing = false;
      },
      (error) => {
        console.log(error);
       this.refreshing = false;
      }
    );
  }

}
