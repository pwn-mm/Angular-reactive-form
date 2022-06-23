import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../services/api.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

// interface Category {
//   value: string;
//   viewValue: string;
// }

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss'],
})
export class DialogComponent implements OnInit {
  selectedValue: string;

  // dummies
  // phones: Category[] = [
  //   { value: 'a-0', viewValue: 'Apple' },
  //   { value: 'op-1', viewValue: 'One Plus' },
  //   { value: 'ss-2', viewValue: 'Samsaung' },
  // ];

  phones = ['Apple', 'One Plus', 'Samsaung'];

  originalityList = ['Brand New', 'Second Hand', 'Refurbished'];

  productForm!: FormGroup;

  actionBtn: string = 'Save';

  snackDuration = 2;

  // Inject formbuilder, http service
  constructor(
    private formBuilder: FormBuilder,
    private api: ApiService,
    private _snackBar: MatSnackBar,
    private dialogRef: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) public editData: any
  ) { }

  ngOnInit(): void {
    this.productForm = this.formBuilder.group({
      productName: ['', Validators.required],
      category: ['', Validators.required],
      originality: ['', Validators.required],
      price: ['', Validators.required],
      comment: ['', Validators.required],
      date: ['', Validators.required],
    });
    // console.log(this.editData);
    //* If editData ? pass the values to the productForm using controls
    if (this.editData) {
      this.actionBtn = 'Update';
      this.productForm.controls['productName'].setValue(
        this.editData.productName
      );
      this.productForm.controls['category'].setValue(this.editData.category);
      this.productForm.controls['originality'].setValue(
        this.editData.originality
      );
      this.productForm.controls['price'].setValue(this.editData.price);
      this.productForm.controls['comment'].setValue(this.editData.comment);
      this.productForm.controls['date'].setValue(this.editData.date);
    }
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

  //* Add Product Function and show snack msg after adding the product
  openSnackBar(): void {
    // Process checkout data here
    if (!this.editData) {
      if (this.productForm.valid) {
        console.log('Your order has been submitted', this.productForm.value);

        this.api.postProduct(this.productForm.value).subscribe({
          next: (res) => {
            alert('Product added successfully.')
            this._snackBar.openFromComponent(SnackAddProduct, {
              duration: this.snackDuration * 1000,
            });
            this.productForm.reset();
            this.dialogRef.close('save');
          },
          error: () => {
            // alert("Error while adding the product...")
            this._snackBar.openFromComponent(SnackErrorProduct, {
              duration: this.snackDuration * 1000,
            });
          },
        });
      } else {
        this._snackBar.openFromComponent(SnackErrorProduct, {
          duration: this.snackDuration * 1000,
        });
      }
    } else {
      this.updateProduct();
    }
  }

  //* Update Product
  updateProduct() {
    this.api.putProduct(this.productForm.value, this.editData.id).subscribe({
      next: (res) => {
        alert('Product Updated.')
        this._snackBar.openFromComponent(SnackUpdateProduct, {
          duration: this.snackDuration * 1000,
        });
        this.productForm.reset();
        this.dialogRef.close('update');
      },
      error: () => {
        this._snackBar.openFromComponent(SnackErrorProduct, {
          duration: this.snackDuration * 1000,
        });
      },
    });
  }
}

// For Snacks
@Component({
  selector: 'add-snack',
  template: `
    <span class="example-pizza-party"> Yayy!!! Added a new product 🍕 </span>
  `,
  styles: [
    `
      .example-pizza-party {
        color: white;
        display: flex;
        align-items: center;
        justify-content: center;
      }
    `,
  ],
})
export class SnackAddProduct { }

@Component({
  selector: 'update-snack',
  template: `
    <span class="example-pizza-party"> Yayy!!! Successfully Updated. 🤑 </span>
  `,
  styles: [
    `
      .example-pizza-party {
        color: white;
        display: flex;
        align-items: center;
        justify-content: center;
      }
    `,
  ],
})
export class SnackUpdateProduct { }

@Component({
  selector: 'error-snack',
  template: `
    <span class="example-pizza-party"> Nah..! Something goes wrong 😣 </span>
  `,
  styles: [
    `
      .example-pizza-party {
        color: white;
        display: flex;
        align-items: center;
        justify-content: center;
      }
    `,
  ],
})
export class SnackErrorProduct { }
