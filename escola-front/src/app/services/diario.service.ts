import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AlunoDisciplina } from '../models/escola.models';

export interface LancamentoBimestreDTO {
  nota: number | null;
}

@Injectable({
  providedIn: 'root'
})
export class DiarioService {

  private readonly apiUrl = 'http://localhost:8080/api';

  constructor(private http: HttpClient) { }

  getAlunosPorDisciplina(idDisciplina: number): Observable<AlunoDisciplina[]> {
    return this.http.get<AlunoDisciplina[]>(`${this.apiUrl}/disciplina/${idDisciplina}/matriculados`);
  }

  atualizarPrimeiroBimestre(idAluno: number, idDisciplina: number, dados: LancamentoBimestreDTO): Observable<AlunoDisciplina> {
    const url = `${this.apiUrl}/aluno/${idAluno}/disciplina/${idDisciplina}/1bim`;
    return this.http.put<AlunoDisciplina>(url, dados);
  }

  atualizarSegundoBimestre(idAluno: number, idDisciplina: number, dados: LancamentoBimestreDTO): Observable<AlunoDisciplina> {
    const url = `${this.apiUrl}/aluno/${idAluno}/disciplina/${idDisciplina}/2bim`;
    return this.http.put<AlunoDisciplina>(url, dados);
  }
}