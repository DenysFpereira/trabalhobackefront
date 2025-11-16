import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common'; 
import { FormsModule } from '@angular/forms'; 

import { DiarioService, LancamentoBimestreDTO } from '../services/diario.service';
import { AlunoDisciplina, Disciplina } from '../models/escola.models';
import { DisciplinaService } from '../services/disciplina.service';
import { forkJoin, Observable } from 'rxjs';

@Component({
  selector: 'app-lancamento-notas',
  standalone: true, 
  imports: [ CommonModule, FormsModule ],
  templateUrl: './lancamento-notas.html',
  styleUrl: './lancamento-notas.css' 
})
export class LancamentoNotasComponent implements OnInit {

  listaDisciplinas: Disciplina[] = [];
  disciplinaSelecionadaId: number | null = null;
  listaAlunos: AlunoDisciplina[] = [];

  private diarioService = inject(DiarioService);
  private disciplinaService = inject(DisciplinaService);

  constructor() {}

  ngOnInit(): void {
    this.carregarDisciplinas();
  }

  carregarDisciplinas() {
    this.disciplinaService.listarTodasDisciplinas().subscribe({
      next: (dados: Disciplina[]) => {
        this.listaDisciplinas = dados;
      },
      error: (erro: any) => {
        console.error("Erro ao buscar disciplinas:", erro);
        alert("Falha ao carregar disciplinas. O backend está rodando?");
      }
    });
  }

  onDisciplinaSelecionada() {
    if (this.disciplinaSelecionadaId) {
      this.buscarAlunosDaDisciplina(this.disciplinaSelecionadaId);
    } else {
      this.listaAlunos = [];
    }
  }

  buscarAlunosDaDisciplina(idDisciplina: number) {
    this.diarioService.getAlunosPorDisciplina(idDisciplina).subscribe({
      next: (dados: AlunoDisciplina[]) => {
        this.listaAlunos = dados.map(item => {
          item.mediaFinal = this.calcularMedia(item.nota1Bim, item.nota2Bim);
          return item;
        });
      },
      error: (erro: any) => {
        console.error("Erro ao buscar alunos:", erro);
        this.listaAlunos = []; 
      }
    });
  }

  private calcularMedia(n1: number | null, n2: number | null): number {
    if (n1 !== null && n2 !== null) {
      return (Number(n1) + Number(n2)) / 2.0;
    }
    return 0; 
  }

  atualizarMediaNaTela(item: AlunoDisciplina) {
    item.mediaFinal = this.calcularMedia(item.nota1Bim, item.nota2Bim);
  }

  salvarLancamentos() {
    if (!this.disciplinaSelecionadaId) {
      alert("Nenhuma disciplina selecionada.");
      return;
    }

    const requisicoesDeSalvamento: Observable<any>[] = [];

    this.listaAlunos.forEach(item => {
      const dto1Bim: LancamentoBimestreDTO = {
        nota: item.nota1Bim
      };
      const dto2Bim: LancamentoBimestreDTO = {
        nota: item.nota2Bim
      };

      const alunoId = item.aluno.id;
      const discId = this.disciplinaSelecionadaId!; 

      requisicoesDeSalvamento.push(
        this.diarioService.atualizarPrimeiroBimestre(alunoId, discId, dto1Bim)
      );
      
      requisicoesDeSalvamento.push(
        this.diarioService.atualizarSegundoBimestre(alunoId, discId, dto2Bim)
      );
    });

    if (requisicoesDeSalvamento.length === 0) {
      return;
    }

    forkJoin(requisicoesDeSalvamento).subscribe({
      next: () => {
        this.recarregarAposSalvar();
      },
      error: (err: any) => {
        console.error("Erro ao salvar lançamentos:", err);
        alert("Ocorreu um erro ao salvar as notas.");
      }
    });
  }

  private recarregarAposSalvar() {
    alert("Notas salvas com sucesso!");
    if (this.disciplinaSelecionadaId) {
      this.buscarAlunosDaDisciplina(this.disciplinaSelecionadaId);
    }
  }
}