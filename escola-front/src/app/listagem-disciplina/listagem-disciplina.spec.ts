import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListagemDisciplina } from './listagem-disciplina';

describe('ListagemDisciplina', () => {
  let component: ListagemDisciplina;
  let fixture: ComponentFixture<ListagemDisciplina>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListagemDisciplina]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListagemDisciplina);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
