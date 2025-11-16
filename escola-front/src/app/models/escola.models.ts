export interface Aluno {
  id: number;
  nome: string;
  cpf: string;
  ra: string;
  anoIngresso: number;
  periodoAtual: number;
  ativo: boolean;
}

export interface Disciplina {
  id: number;
  professor: any; 
  codigo: string;
  descricao: string;
  ementa: string;
  ativo: boolean;
}

export type SituacaoAluno = 'APROVADO' | 'REPROVADO' | 'EM_CURSO';

export interface AlunoDisciplina {
  id: number;
  aluno: Aluno;
  disciplina: Disciplina;
  
  nota1Bim: number | null;
  nota2Bim: number | null;
  totalFaltas: number | null;
  
  matriculado: boolean;
  situacao: SituacaoAluno;

  mediaFinal?: number;
}