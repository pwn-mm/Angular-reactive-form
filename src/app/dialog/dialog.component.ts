import { Component, OnInit } from '@angular/core';

interface Category {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit {

  selectedValue: string;

  // dummies
  phones: Category[] = [
    { value: 'a-0', viewValue: 'Apple' },
    { value: 'op-1', viewValue: 'One Plus' },
    { value: 'ss-2', viewValue: 'Samsaung' },
  ];


  freshnessList = ["Brand New", "Second Hand", "Refurbished"]

  constructor() { }

  ngOnInit(): void {
  }

}
