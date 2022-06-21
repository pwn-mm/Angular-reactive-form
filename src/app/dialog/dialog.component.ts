import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validator, Validators } from '@angular/forms';
import { ApiService } from '../services/api.service';
import { MatSnackBar } from '@angular/material/snack-bar';

interface Category {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss'],
})
export class DialogComponent implements OnInit {
  selectedValue: string;

  // dummies
  phones: Category[] = [
    { value: 'a-0', viewValue: 'Apple' },
    { value: 'op-1', viewValue: 'One Plus' },
    { value: 'ss-2', viewValue: 'Samsaung' },
  ];

  originalityList = ['Brand New', 'Second Hand', 'Refurbished'];

  productForm!: FormGroup;

  snackDuration = 5;

  // Inject formbuilder, http service
  constructor(private formBuilder: FormBuilder, private api: ApiService, private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.productForm = this.formBuilder.group({
      productName: ['', Validators.required],
      category: ['', Validators.required],
      originality: ['', Validators.required],
      price: ['', Validators.required],
      comment: ['', Validators.required],
      date: ['', Validators.required],
    });
  }

  /* addProduct(): void {
    // Process checkout data here
    if (this.productForm.value && this.productForm.valid) {
      console.log('Your order has been submitted', this.productForm.value);

      this.api.postProduct(this.productForm.value).subscribe({
        next: (res) => {
          alert('Product added successfully.')
        },
        error: () => {
          alert("Error while adding the product...")
        }
      })
      this.productForm.reset();
    }
  } */

  openSnackBar(): void {
    // Process checkout data here
    if (this.productForm.value && this.productForm.valid) {
      console.log('Your order has been submitted', this.productForm.value);

      this.api.postProduct(this.productForm.value).subscribe({
        next: (res) => {
          // alert('Product added successfully.')
          this._snackBar.openFromComponent(SnackTruePartyComponent, { duration: this.snackDuration * 1000 })
        },
        error: () => {
          // alert("Error while adding the product...")
          this._snackBar.openFromComponent(SnackFalsePartyComponent, { duration: this.snackDuration * 1000 })
        }
      })
      this.productForm.reset();
    }
    else {
      this._snackBar.openFromComponent(SnackFalsePartyComponent, { duration: this.snackDuration * 1000 })
    }

  }
}

// For Snacks
@Component({
  selector: 'snack-bar-component-true-snack',
  templateUrl: './snack-bar-component-true-snack.html',
  styles: [
    `
    .example-pizza-party {
      color: white;
      display: flex;
      align-items: center;
      justify-content:center;
    }
  `,
  ],
})

export class SnackTruePartyComponent { }
@Component({
  selector: 'snack-bar-component-false-snack',
  templateUrl: './snack-bar-component-false-snack.html',
  styles: [
    `
    .example-pizza-party {
      color: white;
      display: flex;
      align-items: center;
      justify-content:center;
    }
  `,
  ],
})
export class SnackFalsePartyComponent { }
