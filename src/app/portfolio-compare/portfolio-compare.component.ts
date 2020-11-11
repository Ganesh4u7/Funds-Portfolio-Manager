import { Component, OnDestroy,OnInit } from '@angular/core';
import {FormsModule,ReactiveFormsModule} from '@angular/forms';
import {FormControl, FormGroup,NgForm} from '@angular/forms';
import {Subject} from 'rxjs';
import { HttpService } from '../http.service';

@Component({
  selector: 'app-portfolio-compare',
  templateUrl: './portfolio-compare.component.html',
  styles: [
  ]
})
export class PortfolioCompareComponent implements OnDestroy,OnInit {
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  portfolioComapreForm :FormGroup;
  similarity:string;
  holdingDiff;
  mutualFundComparisons;
  mutualFunds;
  showTable = false;
  funds;

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
  ngOnDestroy(): void{
    this.dtTrigger.unsubscribe();
  }

  onPortfolioComare(){
    this.httpService.onPortfolioComare(this.portfolioComapreForm.value).subscribe((response)=>{
      if(response){
        this.similarity = response.similarity;
        this.holdingDiff = response.holdingDiff;
        this.mutualFundComparisons = response.mutualFundComparisons;
        this.showTable = true;
         this.dtTrigger.next();
      }
    },
    (error)=>{
      console.log(error)
    });
  }

  onSelectHoldingValue(index){
    this.mutualFunds = this.holdingDiff[index].mutualFunds;
  }

}
