import { AfterViewInit, Component, OnDestroy,OnInit } from '@angular/core';
import {FormsModule,ReactiveFormsModule} from '@angular/forms';
import {FormControl, FormGroup,NgForm} from '@angular/forms';
import {Subject} from 'rxjs';
import { HttpService } from '../http.service';

@Component({
  selector: 'app-my-portfolio-compare',
  templateUrl: './my-portfolio-compare.component.html',
  styleUrls: ['./my-portfolio-compare.component.css']
})
export class MyPortfolioCompareComponent implements OnDestroy,OnInit,AfterViewInit {
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  portfolioComapreForm :FormGroup;
  similarity:string;
  holdingDiff;
  mutualFundComparisons;
  mutualFunds;
  showTable = false;
  funds;
  refreshing = false;

  constructor(private httpService: HttpService) { }

  ngOnInit(): void {

    this.dtOptions = {
      pagingType: 'full_numbers',
      destroy:true,
      retrieve:true
    };

    this.portfolioComapreForm = new FormGroup({
      name: new FormControl(null),
      mcUrl: new FormControl(null)
    });
  }
  ngAfterViewInit(): void {this.dtTrigger.next();}
  ngOnDestroy(): void{
    this.dtTrigger.unsubscribe();
  }

  onPortfolioComare(){
    this.refreshing = true;
    this.httpService.onPortfolioComare(this.portfolioComapreForm.value).subscribe((response)=>{
      if(response){
        this.similarity = response.similarity;
        this.holdingDiff = response.holdingDiff;
        this.mutualFundComparisons = response.mutualFundComparisons;
        this.showTable = true; 
        this.refreshing = false;
         this.dtTrigger.next();
      }
    },
    (error)=>{
      console.log(error);
      this.refreshing = false;
    });
  }

  onSelectHoldingValue(index){
    this.mutualFunds = this.holdingDiff[index].mutualFunds;
  }

}
