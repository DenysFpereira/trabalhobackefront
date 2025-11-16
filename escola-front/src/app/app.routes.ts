import { Routes } from '@angular/router';

import { PortalComponent } from './portal/portal';
import { ProfessorLayoutComponent } from './professor-layout/professor-layout';

import { LancamentoNotasComponent } from './lancamento-notas/lancamento-notas';
import { CadastroAlunoComponent } from './cadastro-aluno/cadastro-aluno';
import { ListagemAlunoComponent } from './listagem-aluno/listagem-aluno';
import { CadastroProfessorComponent } from './cadastro-professor/cadastro-professor';
import { ListagemProfessorComponent } from './listagem-professor/listagem-professor';
import { CadastroDisciplinaComponent } from './cadastro-disciplina/cadastro-disciplina';
import { ListagemDisciplinaComponent } from './listagem-disciplina/listagem-disciplina';
import { MatriculaComponent } from './matricula/matricula';
import { LancamentoPresencaComponent } from './lancamento-presenca/lancamento-presenca';

import { AlunoLoginComponent } from './aluno-login/aluno-login';
import { AlunoBoletimComponent } from './aluno-boletim/aluno-boletim';

export const routes: Routes = [
  
  { 
    path: '', 
    component: PortalComponent 
  },
  
  {
    path: 'professor', 
    component: ProfessorLayoutComponent,
    children: [
      { path: 'lancamento', component: LancamentoNotasComponent },
      
      { path: 'cadastro-aluno', component: CadastroAlunoComponent },
      { path: 'cadastro-aluno/editar/:id', component: CadastroAlunoComponent },
      { path: 'listagem-aluno', component: ListagemAlunoComponent },
      
      { path: 'cadastro-professor', component: CadastroProfessorComponent },
      { path: 'cadastro-professor/editar/:id', component: CadastroProfessorComponent },
      { path: 'listagem-professor', component: ListagemProfessorComponent },

      { path: 'cadastro-disciplina', component: CadastroDisciplinaComponent },
      { path: 'cadastro-disciplina/editar/:id', component: CadastroDisciplinaComponent },
      { path: 'listagem-disciplina', component: ListagemDisciplinaComponent },

      { path: 'matricula', component: MatriculaComponent },
      { path: 'lancamento-presenca', component: LancamentoPresencaComponent },
      
      { path: '', redirectTo: 'lancamento', pathMatch: 'full' }
    ]
  },
  
  { 
    path: 'acesso-aluno', 
    component: AlunoLoginComponent 
  },
  { 
    path: 'aluno-boletim/:ra', 
    component: AlunoBoletimComponent 
  },
  
  { 
    path: '**', 
    redirectTo: '', 
    pathMatch: 'full' 
  }
];