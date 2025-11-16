import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { Professor, ProfessorService } from '../services/professor.service';
import { DisciplinaService } from '../services/disciplina.service';

@Component({
  selector: 'app-cadastro-disciplina',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './cadastro-disciplina.html',
  styleUrl: './cadastro-disciplina.css'
})
export class CadastroDisciplinaComponent implements OnInit {

  disciplinaForm: FormGroup;
  professores: Professor[] = [];
  
  modoEdicao = false;
  disciplinaId: number | null = null;
  
  private fb = inject(FormBuilder);
  private professorService = inject(ProfessorService);
  private disciplinaService = inject(DisciplinaService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  constructor() {
    this.disciplinaForm = this.fb.group({
      codigo: ['', Validators.required],
      descricao: ['', Validators.required],
      ementa: [''],
      professor: [null, Validators.required] 
    });
  }

  ngOnInit(): void {
    this.carregarProfessores();

    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      this.modoEdicao = true;
      this.disciplinaId = Number(idParam);
      
      this.disciplinaForm.get('codigo')?.disable(); // Código não pode ser editado
      
      this.carregarDadosDaDisciplina(this.disciplinaId);
    }
  }

  carregarProfessores() {
    this.professorService.listarProfessoresAtivos().subscribe({
      next: (lista) => {
        this.professores = lista;
      },
      error: (erro) => {
        console.error('Falha ao buscar professores:', erro);
      }
    });
  }

  carregarDadosDaDisciplina(id: number) {
    this.disciplinaService.buscarDisciplinaPorId(id).subscribe({
      next: (disciplina) => {
        this.disciplinaForm.patchValue({
          codigo: disciplina.codigo,
          descricao: disciplina.descricao,
          ementa: disciplina.ementa,
        });
        if (disciplina.professor) {
          const professorSelecionado = this.professores.find(p => p.id === disciplina.professor.id);
          if (professorSelecionado) {
            this.disciplinaForm.get('professor')?.setValue(professorSelecionado);
          }
        }
      },
      error: (err) => {
        alert('Erro ao carregar dados da disciplina.');
        console.error(err);
      }
    });
  }

  onSubmit() {
    if (this.disciplinaForm.invalid) {
      alert('Formulário inválido. Preencha todos os campos.');
      return;
    }
      
    const dadosDoFormulario = this.disciplinaForm.getRawValue();
      
    if (this.modoEdicao && this.disciplinaId) {
      this.disciplinaService.atualizarDisciplina(this.disciplinaId, dadosDoFormulario).subscribe({
        next: (disciplinaAtualizada) => {
          alert(`Disciplina "${disciplinaAtualizada.descricao}" atualizada!`);
          this.router.navigate(['/listagem-disciplina']);
        },
        error: (err) => {
          alert('Erro ao atualizar disciplina.');
          console.error(err);
        }
      });
    } else {
      this.disciplinaService.cadastrarDisciplina(dadosDoFormulario).subscribe({
        next: (disciplinaCadastrada) => {
          alert(`Disciplina "${disciplinaCadastrada.descricao}" cadastrada!`);
          this.disciplinaForm.reset();
        },
        error: (erro) => {
          console.error('Erro ao cadastrar disciplina:', erro);
          alert('Erro ao cadastrar: Verifique se o Código da disciplina já existe.');
        }
      });
    }
  }
}