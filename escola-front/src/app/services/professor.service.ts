import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface Professor {
  id: number;
  nome: string;
  cpf: string;
  matricula: string;
  ativo?: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class ProfessorService {

  private readonly apiUrl = 'http://localhost:8080/api/professor';

  constructor(private http: HttpClient) { }

  cadastrarProfessor(professor: Partial<Professor>): Observable<Professor> {
    return this.http.post<Professor>(this.apiUrl, professor);
  }

  listarProfessoresAtivos(): Observable<Professor[]> {
    return this.http.get<Professor[]>(`${this.apiUrl}/todos`);
  }

  buscarProfessorPorId(id: number): Observable<Professor> {
    return this.http.get<Professor>(`${this.apiUrl}/id/${id}`);
  }

  atualizarProfessor(id: number, professor: Partial<Professor>): Observable<Professor> {
    return this.http.put<Professor>(`${this.apiUrl}/${id}`, professor);
  }

  inativarProfessor(id: number): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${id}/inativar`, null);
  }
  
  reativarProfessor(id: number): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${id}/reativar`, null);
  }
}