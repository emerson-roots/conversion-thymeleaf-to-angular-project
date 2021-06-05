import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CargoCadastroComponent } from './cargo-cadastro.component';

describe('CargoCadastroComponent', () => {
  let component: CargoCadastroComponent;
  let fixture: ComponentFixture<CargoCadastroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CargoCadastroComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CargoCadastroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
