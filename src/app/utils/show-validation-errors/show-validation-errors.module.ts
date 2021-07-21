import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShowValidationErrorsComponent } from './show-validation-errors.component';


@NgModule({
  declarations: [
    ShowValidationErrorsComponent
  ],
  imports: [ CommonModule ],
  exports: [ShowValidationErrorsComponent]
})
export class ShowValidationErrorsModule { }
