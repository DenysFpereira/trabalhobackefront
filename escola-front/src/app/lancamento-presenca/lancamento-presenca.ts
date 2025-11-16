import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DisciplinaService } from '../services/disciplina.service';
import { DiarioService } from '../services/diario.service';
import { AulaService, PresencaDTO } from '../services/aula.service';
import { AlunoDisciplina, Disciplina } from '../models/escola.models';

interface AlunoPresenca {
  id: number;
  nome: string;
  ra: string;
  falta: boolean;
}

@Component({
  selector: 'app-lancamento-presenca',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './lancamento-presenca.html',
  styleUrl: './lancamento-presenca.css'
})
export class LancamentoPresencaComponent implements OnInit {

  listaDisciplinas: Disciplina[] = [];
  listaAlunos: AlunoPresenca[] = [];

  disciplinaSelecionadaId: number | null = null;
  dataAula: string = '';
  idAulaDada: number | null = null;
  alunosCarregados = false;

  private disciplinaService = inject(DisciplinaService);
  private diarioService = inject(DiarioService);
  private aulaService = inject(AulaService);

  constructor() {}

  ngOnInit(): void {
    this.dataAula = this.getTodayDateString();
    this.carregarDisciplinas();
  }

  getTodayDateString(): string {
    const today = new Date();
    const year = today.getFullYear();
    const month = (today.getMonth() + 1).toString().padStart(2, '0');
    const day = today.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  carregarDisciplinas() {
    this.disciplinaService.listarTodasDisciplinas().subscribe({
      next: (dados) => this.listaDisciplinas = dados,
      error: (err) => console.error("Erro ao carregar disciplinas", err)
    });
  }

  onDisciplinaChange() {
    this.alunosCarregados = false;
    this.listaAlunos = [];
    this.idAulaDada = null;
  }

  onCarregarAlunos() {
    if (!this.disciplinaSelecionadaId || !this.dataAula) {
      alert("Selecione a disciplina e a data.");
      return;
    }

    this.diarioService.getAlunosPorDisciplina(this.disciplinaSelecionadaId).subscribe({
      next: (matriculas: AlunoDisciplina[]) => {
        this.listaAlunos = matriculas.map(m => ({
          id: m.aluno.id,
          nome: m.aluno.nome,
          ra: m.aluno.ra,
          falta: false
        }));
        this.alunosCarregados = true;
      },
      error: (err) => {
        console.error("Erro ao carregar alunos", err);
        alert("Erro ao carregar alunos.");
      }
    });
  }

  onSalvarPresenca() {
    if (!this.disciplinaSelecionadaId || !this.dataAula || this.listaAlunos.length === 0) {
      alert("Carregue os alunos primeiro.");
      return;
    }

    this.aulaService.cadastrarAula(this.disciplinaSelecionadaId, this.dataAula).subscribe({
      next: (aulaDada) => {
        this.idAulaDada = aulaDada.id;
        
        const listaPresencaDTO: PresencaDTO[] = this.listaAlunos.map(aluno => ({
          alunoId: aluno.id,
          falta: aluno.falta
        }));

        this.aulaService.salvarPresencas(this.idAulaDada, listaPresencaDTO).subscribe({
          next: () => {
            alert("Presença salva com sucesso!");
            this.alunosCarregados = false;
            this.listaAlunos = [];
            this.idAulaDada = null;
          },
          error: (err) => {
            console.error("Erro ao salvar presenças", err);
            alert("Erro ao salvar presenças.");
          }
        });
      },
      error: (err) => {
        console.error("Erro ao cadastrar aula", err);
        alert("Erro ao cadastrar a aula.");
      }
    });
  }

  marcarTodos(presenteOuFalta: boolean) {
    this.listaAlunos.forEach(aluno => aluno.falta = presenteOuFalta);
  }
}