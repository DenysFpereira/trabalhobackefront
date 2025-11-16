import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

import { Aluno } from '../models/escola.models';
import { Disciplina } from '../models/escola.models';
import { AlunoService } from '../services/aluno.service';
import { DisciplinaService } from '../services/disciplina.service';
import { MatriculaService } from '../services/matricula.service';

@Component({
  selector: 'app-matricula',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './matricula.html',
  styleUrl: './matricula.css'
})
export class MatriculaComponent implements OnInit {

  matriculaForm: FormGroup;
  
  listaAlunos: Aluno[] = [];
  listaDisciplinas: Disciplina[] = [];
  
  private fb = inject(FormBuilder);
  private alunoService = inject(AlunoService);
  private disciplinaService = inject(DisciplinaService);
  private matriculaService = inject(MatriculaService);

  constructor() {
    this.matriculaForm = this.fb.group({
      alunoId: [null, Validators.required],
      disciplinaId: [null, Validators.required]
    });
  }

  ngOnInit(): void {
    this.carregarAlunos();
    this.carregarDisciplinas();
  }

  carregarAlunos() {
    this.alunoService.listarAlunos().subscribe(
      (dados: Aluno[]) => this.listaAlunos = dados
    );
  }

  carregarDisciplinas() {
    this.disciplinaService.listarTodasDisciplinas().subscribe({
      next: (dados: Disciplina[]) => {
        this.listaDisciplinas = dados;
      },
      error: (erro: any) => {
        console.error('Erro ao carregar disciplinas', erro);
      }
    });
  }

  onSubmit() {
    if (this.matriculaForm.invalid) {
      alert('Selecione um aluno E uma disciplina.');
      return;
    }
    
    const dados = this.matriculaForm.value;

    this.matriculaService.matricular(dados).subscribe({
      next: () => {
        alert('Aluno matriculado com sucesso!');
        this.matriculaForm.reset();
      },
      error: (erro: any) => {
        console.error('Erro ao matricular:', erro);
        alert('Falha ao matricular. O aluno já pode estar matriculado nesta disciplina.');
      }
    });
  }
}