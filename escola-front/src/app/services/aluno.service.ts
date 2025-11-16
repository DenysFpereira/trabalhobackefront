import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Aluno, AlunoDisciplina } from '../models/escola.models';

@Injectable({
  providedIn: 'root'
})
export class AlunoService {

  private readonly apiUrl = 'http://localhost:8080/api/aluno';

  constructor(private http: HttpClient) { }

  cadastrarAluno(aluno: Partial<Aluno>): Observable<Aluno> {
    return this.http.post<Aluno>(this.apiUrl, aluno);
  }

  listarAlunos(): Observable<Aluno[]> {
    return this.http.get<Aluno[]>(`${this.apiUrl}/todos`);
  }

  inativarAluno(id: number): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${id}/inativar`, null);
  }

  buscarAlunoPorId(id: number): Observable<Aluno> {
    return this.http.get<Aluno>(`${this.apiUrl}/id/${id}`);
  }

  atualizarAluno(id: number, aluno: Partial<Aluno>): Observable<Aluno> {
    return this.http.put<Aluno>(`${this.apiUrl}/${id}`, aluno);
  }

  reativarAluno(id: number): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${id}/reativar`, null);
  }

  getBoletimPorRa(ra: string): Observable<AlunoDisciplina[]> {
    return this.http.get<AlunoDisciplina[]>(`${this.apiUrl}/ra/${ra}/boletim`);
  }
}