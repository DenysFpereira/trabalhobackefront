import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Disciplina } from '../models/escola.models';
import { DisciplinaService } from '../services/disciplina.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-listagem-disciplina',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './listagem-disciplina.html',
  styleUrl: './listagem-disciplina.css'
})
export class ListagemDisciplinaComponent implements OnInit {

  listaDeDisciplinas: Disciplina[] = [];
  disciplinasFiltradas: Disciplina[] = [];
  termoBusca: string = '';
  
  private disciplinaService = inject(DisciplinaService);

  ngOnInit(): void {
    this.carregarDisciplinas();
  }

  carregarDisciplinas() {
    /**
     * MÉTODO ATUALIZADO
     * Agora busca TODAS
     */
    this.disciplinaService.listarTodasDisciplinas().subscribe({
      next: (dados) => {
        this.listaDeDisciplinas = dados;
        this.disciplinasFiltradas = dados;
      },
      error: (erro) => {
        console.error('Erro ao carregar disciplinas', erro);
        alert('Falha ao carregar lista de disciplinas.');
      }
    });
  }

  filtrarDisciplinas() {
    const termo = this.termoBusca.toLowerCase();
    
    this.disciplinasFiltradas = this.listaDeDisciplinas.filter(disc =>
      disc.descricao.toLowerCase().includes(termo) ||
      disc.codigo.toLowerCase().includes(termo) ||
      (disc.professor && disc.professor.nome.toLowerCase().includes(termo)) 
        );
  }

  onInativar(disciplina: Disciplina) {
    const confirmou = confirm(`Tem certeza que deseja INATIVAR a disciplina "${disciplina.descricao}"?`);

    if (confirmou) {
      this.disciplinaService.inativarDisciplina(disciplina.id).subscribe({
        next: () => {
          alert('Disciplina inativada com sucesso.');
          disciplina.ativo = false;
        },
        error: (erro) => {
          console.error('Erro ao inativar disciplina', erro);
          alert('Falha ao inativar disciplina.');
        }
      });
    }
  }
  onReativar(disciplina: Disciplina) {
    const confirmou = confirm(`Tem certeza que deseja REATIVAR a disciplina "${disciplina.descricao}"?`);

    if (confirmou) {
      this.disciplinaService.reativarDisciplina(disciplina.id).subscribe({
        next: () => {
          alert('Disciplina reativada com sucesso.');
          disciplina.ativo = true;
        },
        error: (erro) => {
          console.error('Erro ao reativar disciplina', erro);
          alert('Falha ao reativar disciplina.');
        }
      });
    }
  }
}