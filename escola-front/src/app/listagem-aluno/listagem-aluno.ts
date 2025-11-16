import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Aluno } from '../models/escola.models';
import { AlunoService } from '../services/aluno.service';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms'; // 1. IMPORTAR FORMSMODULE

@Component({
  selector: 'app-listagem-aluno',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule], // 2. ADICIONAR FORMSMODULE
  templateUrl: './listagem-aluno.html',
  styleUrl: './listagem-aluno.css'
})
export class ListagemAlunoComponent implements OnInit {

  // A lista 'master' que vem da API
  listaDeAlunos: Aluno[] = [];
  
  // A lista que será exibida na tela (já filtrada)
  alunosFiltrados: Aluno[] = [];
  
  // O texto digitado na barra de busca
  termoBusca: string = '';

  private alunoService = inject(AlunoService);

  ngOnInit(): void {
    this.carregarAlunos();
  }

  carregarAlunos() {
    this.alunoService.listarAlunos().subscribe({
      next: (dados) => {
        this.listaDeAlunos = dados;
        this.alunosFiltrados = dados;
      },
      error: (erro) => {
        console.error('Erro ao carregar alunos', erro);
        alert('Falha ao carregar lista de alunos.');
      }
    });
  }
  filtrarAlunos() {
    const termo = this.termoBusca.toLowerCase();
    
    this.alunosFiltrados = this.listaDeAlunos.filter(aluno =>
      aluno.nome.toLowerCase().includes(termo) ||
      aluno.ra.toLowerCase().includes(termo) ||
      aluno.cpf.toLowerCase().includes(termo)
    );
  }

  onInativar(aluno: Aluno) {
    const confirmou = confirm(`Tem certeza que deseja INATIVAR o aluno "${aluno.nome}"?`);

    if (confirmou) {
      this.alunoService.inativarAluno(aluno.id).subscribe({
        next: () => {
          alert('Aluno inativado com sucesso.');
          aluno.ativo = false; 
        },
        error: (erro) => {
          console.error('Erro ao inativar aluno', erro);
          alert('Falha ao inativar aluno.');
        }
      });
    }
  }

  onReativar(aluno: Aluno) {
    const confirmou = confirm(`Tem certeza que deseja REATIVAR o aluno "${aluno.nome}"?`);

    if (confirmou) {
      this.alunoService.reativarAluno(aluno.id).subscribe({
        next: () => {
          alert('Aluno reativado com sucesso.');
          aluno.ativo = true; 
        },
        error: (erro) => {
          console.error('Erro ao reativar aluno', erro);
          alert('Falha ao reativar aluno.');
        }
      });
    }
  }
}