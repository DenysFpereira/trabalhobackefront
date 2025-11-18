import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProfessorService } from '../services/professor.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-cadastro-professor',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './cadastro-professor.html',
  styleUrl: './cadastro-professor.css'
})
export class CadastroProfessorComponent implements OnInit {

  professorForm: FormGroup;
  modoEdicao = false;
  professorId: number | null = null;
  
  private fb = inject(FormBuilder);
  private professorService = inject(ProfessorService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  constructor() {
    this.professorForm = this.fb.group({
      nome: ['', Validators.required],
      cpf: ['', [Validators.required, Validators.minLength(11), Validators.maxLength(11)]],
      matricula: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      this.modoEdicao = true;
      this.professorId = Number(idParam);
      
      this.professorForm.get('cpf')?.disable();
      this.professorForm.get('matricula')?.disable();
      
      this.carregarDadosDoProfessor(this.professorId);
    }
  }

  carregarDadosDoProfessor(id: number) {
    this.professorService.buscarProfessorPorId(id).subscribe({
      next: (prof) => {
        this.professorForm.patchValue(prof);
      },
      error: (err) => {
        alert('Erro ao carregar dados do professor.');
        console.error(err);
      }
    });
  }

  onSubmit() {
    if (this.professorForm.invalid) {
      alert('Formulário inválido. Preencha todos os campos.');
      return;
    }
    
    const dadosDoFormulario = this.professorForm.getRawValue();

    if (this.modoEdicao && this.professorId) {
      this.professorService.atualizarProfessor(this.professorId, dadosDoFormulario).subscribe({
        next: (profAtualizado) => {
          alert(`Professor "${profAtualizado.nome}" atualizado com sucesso!`);
          this.router.navigate(['/professor/listagem-professor']);
        },
        error: (err) => {
          alert('Erro ao atualizar professor.');
          console.error(err);
        }
      });
    } else {
      this.professorService.cadastrarProfessor(dadosDoFormulario).subscribe({
        next: (professorCadastrado) => {
          alert(`Professor "${professorCadastrado.nome}" cadastrado com sucesso!`);
          this.professorForm.reset();
        },
        error: (erro) => {
          console.error('Erro ao cadastrar professor:', erro);
          alert('Erro ao cadastrar: Verifique se o CPF ou Matrícula já existem.');
        }
      });
    }
  }
}