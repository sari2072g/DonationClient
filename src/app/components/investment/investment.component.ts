import { Component, OnInit } from '@angular/core';
import { Invesment } from 'src/app/Models/Invesment';
import { InvestmentService } from 'src/app/services/investment.service';

@Component({
  selector: 'app-investment',
  templateUrl: './investment.component.html',
  styleUrls: ['./investment.component.css']
})
export class InvestmentComponent implements OnInit {
  listOfInvestment: any[] = []
  first: number = 0
  totalRecords = 20;
  cols: any[] = [];
  rows = 10;
  Max: number;
  dateSale: any;
  buyDate: any;
  min: any;
  Min: any;
  index: any;

  constructor(private investmentService: InvestmentService) { }
  ngOnInit(): void {
    debugger
    console.log(this.listOfInvestment);

    this.investmentService.getTimeSesiedList().subscribe(getdata => {
      debugger
      var result = [];
      var getTimeList = getdata['Time Series (Daily)'];

      for (var i in getTimeList)
        result.push([i, getTimeList[i]]);
      const mone = 0
      result.forEach(element => {
        const object = new Invesment();
        object.open = element[1]['1. open']
        object.time = element[0];
        object.close = element[1]['4. close']
        object.high = element[1]['2. high']
        object.low = element[1]['3. low']
        object.adjusted_close = element[1]['5. adjusted close']
        object.volume = element[1]['6. volume']
        object.dividend_amount = element[1]['7. dividend amount']
        object.price_difference = object.close - object.open;
        this.listOfInvestment.push(object);
      });

      this.cols = [
        { field: 'time', header: 'תאריך' },
        { field: 'open', header: 'מחיר פתיחה' },
        { field: 'high', header: 'מחיר הכי גבוה' },
        { field: 'low', header: 'מחיר הכי נמוך' },
        { field: 'close', header: 'מחיר סגירה' },


        { field: 'price_difference', header: 'הפרש מחירים' }
      ];
      // במידה והמערך לא ממוין נעשה לו מיון לפני שנחשב
      this.listOfInvestment = this.listOfInvestment.sort((a, b) => {
        return <any>new Date(a.time) - <any>new Date(b.time);
      });
      let max = 0;
      let indexMax, indexMin;
      debugger
      //בהנחה שהמערך ממוין
      for (let i = 0; i < this.listOfInvestment.length; i++) {
        for (let j = this.listOfInvestment.length - 1; j > i; j--)
          if (Number((this.listOfInvestment[j].close)) - Number(this.listOfInvestment[i].open) > max) {
            max = Number((this.listOfInvestment[j].close)) - Number(this.listOfInvestment[i].open);
            indexMax = j;
            indexMin = i;
          }
      };
      this.Max = this.listOfInvestment[indexMax].close;
      this.dateSale = this.listOfInvestment[indexMax].time;
      this.buyDate = this.listOfInvestment[indexMin].time
      this.Min = this.listOfInvestment[indexMin].open
    })
  }



  next() {
    this.first = this.first + this.rows;
  }

  prev() {
    this.first = this.first - this.rows;
  }
  isLastPage(): boolean {
    return this.listOfInvestment ? this.first === (this.listOfInvestment.length - this.rows) : true;
  }
}
