import { Component, OnInit } from '@angular/core';
import { InvestmentService } from 'src/app/services/investment.service';

@Component({
  selector: 'app-investment',
  templateUrl: './investment.component.html',
  styleUrls: ['./investment.component.css']
})
export class InvestmentComponent implements OnInit {
  listOfInvestment:any[]=[]
first:number=0
totalRecords=20;
  constructor(private investmentService:InvestmentService) { }
  ngOnInit(): void {
    debugger
    console.log(this.listOfInvestment);
    
    this.investmentService.getTimeSesiedList().subscribe(getdata=>{
      debugger
      var result = [];
      var getTimeList = getdata['Time Series (Daily)'];
   
for(var i in getTimeList)
    result.push([i, getTimeList [i]]);  
     const mone=0
    result.forEach(element => {
      debugger;
  //     const resultp=[];
  //     for(var i in element[1]){}
  //  const a =   Object.assign(element[1][i.replace(/[0-9]\./g, '')])
//     resultp.push(element[1][i.replace(/[0-9]\./g, '')]);
    
      const elementList = Object.assign({time:element[0], detailsDay:element[1]
     
     })
  
     this.listOfInvestment.push(elementList);
    });
    })
  }
}
