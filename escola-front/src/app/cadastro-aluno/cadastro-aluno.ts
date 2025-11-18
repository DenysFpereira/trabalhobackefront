import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AlunoService } from '../services/aluno.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Aluno } from '../models/escola.models';

@Component({
  selector: 'app-cadastro-aluno',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './cadastro-aluno.html',
  styleUrl: './cadastro-aluno.css'
})
export class CadastroAlunoComponent implements OnInit {

  alunoForm: FormGroup;
  modoEdicao = false;
  alunoId: number | null = null;

  private fb = inject(FormBuilder);
  private alunoService = inject(AlunoService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  constructor() {
    this.alunoForm = this.fb.group({
      nome: ['', Validators.required],
      cpf: ['', [Validators.required, Validators.minLength(11), Validators.maxLength(11)]],
      ra: ['', Validators.required],
      anoIngresso: [new Date().getFullYear(), Validators.required],
      periodoAtual: [null, Validators.required]
    });
  }

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    
    if (idParam) {
      this.modoEdicao = true;
      this.alunoId = Number(idParam);
      
      this.alunoForm.get('cpf')?.disable();
      this.alunoForm.get('ra')?.disable();
      
      this.carregarDadosDoAluno(this.alunoId);
    }
  }

  carregarDadosDoAluno(id: number) {
    this.alunoService.buscarAlunoPorId(id).subscribe({
      next: (aluno) => {
        this.alunoForm.patchValue(aluno);
      },
      error: (err) => {
        alert('Erro ao carregar dados do aluno.');
        console.error(err);
      }
    });
  }

  onSubmit() {
    if (this.alunoForm.invalid) {
      alert('Formulário inválido. Por favor, preencha todos os campos obrigatórios.');
      return;
    }

    const dadosDoFormulario = this.alunoForm.getRawValue();

    if (this.modoEdicao && this.alunoId) {
      this.alunoService.atualizarAluno(this.alunoId, dadosDoFormulario).subscribe({
        next: (alunoAtualizado) => {
          alert(`Aluno "${alunoAtualizado.nome}" atualizado com sucesso!`);
          this.router.navigate(['/professor/listagem-aluno']);
        },
        error: (err) => {
          alert('Erro ao atualizar aluno.');
          console.error(err);
        }
      });
      
    } else {
      this.alunoService.cadastrarAluno(dadosDoFormulario).subscribe({
        next: (alunoCadastrado) => {
          alert(`Aluno "${alunoCadastrado.nome}" cadastrado com sucesso! ID: ${alunoCadastrado.id}`);
          this.alunoForm.reset();
        },
        error: (err) => {
          console.error('Erro ao cadastrar aluno:', err);
          alert('Erro ao cadastrar: Verifique se o CPF ou RA já existem.');
        }
      });
    }
  }
}