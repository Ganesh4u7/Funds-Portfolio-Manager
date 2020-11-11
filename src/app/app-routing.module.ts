import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FcmComponent } from './fcm/fcm.component';
import { FundHoldingsComponent } from './fund-holdings/fund-holdings.component';
import { MyFundsComponent } from './my-funds/my-funds.component';
import { MyPortfolioComponent } from './my-portfolio/my-portfolio.component';
import { PortfolioCompareComponent }from './portfolio-compare/portfolio-compare.component';



const routes: Routes = [
  { path: '', component:MyPortfolioComponent  },
  { path: 'fund-holding', component: FundHoldingsComponent },
  { path: 'my-funds', component: MyFundsComponent },
  { path: 'fcm', component: FcmComponent},
  { path: 'portfolioCompare', component:PortfolioCompareComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
