import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validator, Validators } from '@angular/forms';

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


  originalityList = ["Brand New", "Second Hand", "Refurbished"]

  productForm !: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.productForm = this.formBuilder.group({
      productName: ['', Validators.required],
      category: ['', Validators.required],
      originality: ['', Validators.required],
      price: ['', Validators.required],
      comment: ['', Validators.required],
      date: ['', Validators.required],
    })
  }

  addProduct(): void {
    // Process checkout data here
    console.log('Your order has been submitted', this.productForm.value);
    this.productForm.reset();
  }

}
