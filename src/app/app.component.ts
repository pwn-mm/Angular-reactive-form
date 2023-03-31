import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from './dialog/dialog.component';
import { ApiService } from './services/api.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'Angular13Crud';

  displayedColumns: string[] = [
    'id',
    'productName',
    'category',
    'date',
    'originality',
    'price',
    'comment',
    'action',
  ];
  dataSource: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private dialog: MatDialog, private api: ApiService, private _snackBar: MatSnackBar,) { }

  ngOnInit(): void {
    this.getAllProducts();
  }

  snackDuration = 3;

  //* For Opening Dialog
  openDialog() {
    this.dialog
      .open(DialogComponent, {
        width: '30%',
      })
      .afterClosed()
      .subscribe((val) => {
        if (val === 'save') {
          this.getAllProducts();
        }
      });
  }

  //* Getting all products
  getAllProducts() {
    this.api.getProduct().subscribe({
      next: (res) => {
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      error: (err) => {
        alert('Error while fetching the products.');
      },
    });
  }

  //* Edit Product
  editProduct(row: any) {
    this.dialog
      .open(DialogComponent, {
        width: '30%',
        data: row,
      })
      .afterClosed()
      .subscribe((val) => {
        if (val === 'update') {
          this.getAllProducts();
        }
      });
  }

  //* Delete Product
  deleteProduct(id: number) {
    this.api.deleteProduct(id).subscribe({
      next: (res) => {
        this._snackBar.openFromComponent(SnackDeleteProduct, {
          duration: this.snackDuration * 1000,
        });
        this.getAllProducts();
      }
    })
  }

  //* Table Sorting
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}

@Component({
  selector: 'delete-snack',
  template: `
    <span class="example-pizza-party"> Yayy!!! Successfully Deleted. 🚫 </span>
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
export class SnackDeleteProduct { }
