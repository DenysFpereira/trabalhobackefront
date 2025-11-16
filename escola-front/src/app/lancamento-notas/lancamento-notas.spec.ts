import { Component, OnInit } from '@angular/core';
import { DiarioService, LancamentoBimestreDTO } from '../services/diario.service';
import { AlunoDisciplina } from '../models/escola.models';

// Imports necessários para o Angular 17+ (standalone)
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // Essencial para [(ngModel)]
import { HttpClientModule } from '@angular/common/http'; // Já deve estar no app.config.ts

@Component({
  selector: 'app-lancamento-notas',
  standalone: true, // Padrão do Angular 17
  imports: [
    CommonModule,  // Necessário para *ngFor, *ngIf
    FormsModule,   // Necessário para [(ngModel)]
  ],
  templateUrl: './lancamento-notas.html',
  styleUrl: './lancamento-notas.css'
})
export class LancamentoNotasComponent implements OnInit {
  idDisciplinaAtual: number = 1; 
  nomeDisciplina: string = "Desenvolvimento Full-Stack";
  nomeProfessor: string = "Juliana (Professora)";
  listaAlunos: AlunoDisciplina[] = [];
  constructor(private diarioService: DiarioService) {}
  ngOnInit(): void {
    this.carregarAlunosDaDisciplina();
  }
  carregarAlunosDaDisciplina() {
    this.diarioService.getAlunosPorDisciplina(this.idDisciplinaAtual).subscribe(
      (dados) => {
        this.listaAlunos = dados.map(item => {
          item.mediaFinal = this.calcularMedia(item.nota1Bim, item.nota2Bim);
          return item;
        });
      },
      (erro) => {
        console.error("Erro ao buscar alunos:", erro);
        alert("Erro ao carregar dados. O backend está rodando? Veja o console (F12).");
      }
    );
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
    console.log("Salvando todos os lançamentos...");
    let requisicoesConcluidas = 0;
    const totalRequisicoes = this.listaAlunos.length * 2;

    this.listaAlunos.forEach(item => {
      const dto1Bim: LancamentoBimestreDTO = {
        nota: item.nota1Bim,
        faltas: item.faltas1Bim
      };
      const dto2Bim: LancamentoBimestreDTO = {
        nota: item.nota2Bim,
        faltas: item.faltas2Bim
      };

      const alunoId = item.aluno.id;
      const discId = this.idDisciplinaAtual;
      this.diarioService.atualizarPrimeiroBimestre(alunoId, discId, dto1Bim).subscribe(() => {
        requisicoesConcluidas++;
        if (requisicoesConcluidas === totalRequisicoes) this.recarregarAposSalvar();
      });
      this.diarioService.atualizarSegundoBimestre(alunoId, discId, dto2Bim).subscribe(() => {
        requisicoesConcluidas++;
        if (requisicoesConcluidas === totalRequisicoes) this.recarregarAposSalvar();
      });
    });
  }
  private recarregarAposSalvar() {
    alert("Notas salvas com sucesso!");
    this.carregarAlunosDaDisciplina();
  }
}