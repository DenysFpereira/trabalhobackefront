import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Disciplina } from '../models/escola.models';

@Injectable({
  providedIn: 'root'
})
export class DisciplinaService {

  private readonly apiUrl = 'http://localhost:8080/api/disciplina';

  constructor(private http: HttpClient) { }

  cadastrarDisciplina(disciplina: Partial<Disciplina>): Observable<Disciplina> {
    return this.http.post<Disciplina>(this.apiUrl, disciplina);
  }

  listarTodasDisciplinas(): Observable<Disciplina[]> {
    return this.http.get<Disciplina[]>(`${this.apiUrl}/todos`);
  }

  buscarDisciplinaPorId(id: number): Observable<Disciplina> {
    return this.http.get<Disciplina>(`${this.apiUrl}/id/${id}`);
  }

  atualizarDisciplina(id: number, disciplina: Partial<Disciplina>): Observable<Disciplina> {
    return this.http.put<Disciplina>(`${this.apiUrl}/${id}`, disciplina);
  }

  inativarDisciplina(id: number): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${id}/inativar`, null);
  }
  reativarDisciplina(id: number): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${id}/reativar`, null);
  }
}