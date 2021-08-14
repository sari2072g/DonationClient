import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-hatraah',
  templateUrl: './hatraah.component.html',
  styleUrls: ['./hatraah.component.css']
})
export class HatraahComponent implements OnInit {
@Input() message;
@Input() isSuccess;
  constructor() { }

  ngOnInit(): void {
  }

}
