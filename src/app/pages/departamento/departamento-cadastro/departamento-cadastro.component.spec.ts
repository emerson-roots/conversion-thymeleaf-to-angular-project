import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DepartamentoCadastroComponent } from './departamento-cadastro.component';

describe('DepartamentoCadastroComponent', () => {
  let component: DepartamentoCadastroComponent;
  let fixture: ComponentFixture<DepartamentoCadastroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DepartamentoCadastroComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DepartamentoCadastroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
