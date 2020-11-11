import { Injectable } from '@angular/core';
import {HttpClient , HttpHeaders} from '@angular/common/http';
import { from, Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  token = null;


  constructor(
    private http: HttpClient
    ) { }

  onGetFunds() {
    return this.http.get('http://localhost:8080/funds').pipe(
      map((data: any) => {
        return data;
      }), catchError(error => {
        return throwError('Something went wrong!');
      }));
  }
  onUpdateFund(data) {
    console.log(data);
    return this.http.post('http://localhost:8080/funds',data).pipe(
      map((data: any) => {
        return data;
      }), catchError(error => {
        return throwError('Something went wrong!');
      }));
  }
  onDeleteFund(name) {
  return this.http.delete(`http://localhost:8080/funds/${name}`).pipe(
      map((data: any) => {
        return data;
      }), catchError(error => {
        return throwError('Something went wrong!');
      }));
  }
  onGetHolding(name) {
    return this.http.get(`http://localhost:8080/funds/${name}/holdings`).pipe(
      map((data: any) => {
        return data;
      }), catchError(error => {
        return throwError('Something went wrong!');
      }));

      // company, sector, assetShare:float
  }

  onGetPortfolio() {
    return this.http.get('http://localhost:8080/portfolio').pipe(
      map((data: any) => {
        return data;
      }), catchError(error => {
        return throwError('Something went wrong!');
      }));

      //company , sector, value:float ,percentage:float , funds:number
  }

  onGetFundComparison() {
    return this.http.get('http://localhost:8080/funds/comparison').pipe(
      map((data: any) => {
        return data;
      }), catchError(error => {
        return throwError('Something went wrong!');
      }));

    //fund1 fund2  similarity: float stocks:number
  }

  onGetFundCompareOne(fund1,fund2) {
    return this.http.get(`http://localhost:8080/funds/compare/${fund1}/${fund2}`).pipe(
      map((data: any) => {
        return data;
      }), catchError(error => {
        return throwError('Something went wrong!');
      }));

      //company holding1:float holding2:float
  }

  onRefreshPortfolio(){
    return this.http.post('http://localhost:8080/portfolio/refresh',{}).pipe(
      map((data: any) => {
        return data;
      }), catchError(error => {
        return throwError('Something went wrong!');
      }));
  }

 onGetFundsNames(name){
  return this.http.post(`http://localhost:8080/company/funds`,name).pipe(
     map((data: any) => {
       return data;
     }), catchError(error => {
       return throwError('Something went wrong!');
     }));
 }

 onPortfolioComare(data){
   return this.http.post(`http://localhost:8080/portfolio/compare`,data).pipe(
      map((data: any) => {
        return data;
      }), catchError(error => {
        return throwError('Something went wrong!');
      }));
 }

}
