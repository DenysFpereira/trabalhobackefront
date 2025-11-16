import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Professor, ProfessorService } from '../services/professor.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-listagem-professor',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './listagem-professor.html',
  styleUrl: './listagem-professor.css'
})
export class ListagemProfessorComponent implements OnInit {

  listaDeProfessores: Professor[] = [];
  professoresFiltrados: Professor[] = [];
  termoBusca: string = '';

  private professorService = inject(ProfessorService);

  ngOnInit(): void {
    this.carregarProfessores();
  }

  carregarProfessores() {
   
    this.professorService.listarProfessoresAtivos().subscribe({
      next: (dados) => {
        this.listaDeProfessores = dados;
        this.professoresFiltrados = dados;
      },
      error: (erro) => {
        console.error('Erro ao carregar professores', erro);
        alert('Falha ao carregar lista de professores.');
      }
    });
  }

  filtrarProfessores() {
    const termo = this.termoBusca.toLowerCase();
    
    this.professoresFiltrados = this.listaDeProfessores.filter(prof =>
      prof.nome.toLowerCase().includes(termo) ||
      prof.matricula.toLowerCase().includes(termo) ||
      prof.cpf.toLowerCase().includes(termo)
    );
  }

  onInativar(prof: Professor) {
    const confirmou = confirm(`Tem certeza que deseja INATIVAR o professor "${prof.nome}"?`);

    if (confirmou) {
      this.professorService.inativarProfessor(prof.id).subscribe({
        next: () => {
          alert('Professor inativado com sucesso.');
          prof.ativo = false;
        },
        error: (erro) => {
          console.error('Erro ao inativar professor', erro);
          alert('Falha ao inativar professor.');
        }
      });
    }
  }
  onReativar(prof: Professor) {
    const confirmou = confirm(`Tem certeza que deseja REATIVAR o professor "${prof.nome}"?`);

    if (confirmou) {
      this.professorService.reativarProfessor(prof.id).subscribe({
        next: () => {
          alert('Professor reativado com sucesso.');
          prof.ativo = true;
        },
        error: (erro) => {
          console.error('Erro ao reativar professor', erro);
          alert('Falha ao reativar professor.');
        }
      });
    }
  }
}