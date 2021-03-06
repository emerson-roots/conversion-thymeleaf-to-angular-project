import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-show-validation-errors',
  templateUrl: './show-validation-errors.component.html',
  styleUrls: ['./show-validation-errors.component.css']
})
export class ShowValidationErrorsComponent implements OnInit {

  @Input() formCtrl!: any;

  ERROR_MESSAGE: any = {
    required: () => `Campo obrigatório!`,
    minlength: (par: { requiredLength: any }) => `Mínimo ${par.requiredLength} caracteres!`,
    maxlength: (par: { requiredLength: any }) => `Máximo ${par.requiredLength} caracteres!`,
    min: (par: { min: any }) => `Valor mínimo deve ser ${par.min}!`,
    max: (par: { max: any }) => `Valor máximo deve ser ${par.max}!`,
    pattern: () => `Campo esta vazio/em branco!`,
    mask: (par: { requiredMask: any }) => `O campo não está no padrão ${par.requiredMask}!`
  };

  constructor() { }

  ngOnInit() { }

  shouldShowErrors(): boolean {

    return this.formCtrl && this.formCtrl.errors && this.formCtrl.touched;
  }

  listOfErrors(): string[] {
    return Object.keys(this.formCtrl.errors)
      .map(err =>
        this.ERROR_MESSAGE[err](this.formCtrl.getError(err))
      );
  }

}
