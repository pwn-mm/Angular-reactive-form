# Angular13Crud

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 14.0.2.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Notes

- Angular error: `Can't bind to 'ngModel' since it isn't a known property of 'input'`=> you need to import the <b>FormsModule</b> package.
  <br/>

- You also need to import <b>MatNativeDateModule</b> if you are going to use `DatePicker`.

- You also need to import <b>ReactiveFormsModule</b> if you are going to use `[formGroup]`.
