import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ListagemProfessor } from './listagem-professor';

describe('ListagemProfessor', () => {
  let component: ListagemProfessor;
  let fixture: ComponentFixture<ListagemProfessor>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListagemProfessor]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListagemProfessor);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
