import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface PresencaDTO {
  alunoId: number;
  falta: boolean;
}

export interface AulaDada {
  id: number;
  data: string;
  observacoes: string;
}

@Injectable({
  providedIn: 'root'
})
export class AulaService {

  private readonly apiUrl = 'http://localhost:8080/api';

  constructor(private http: HttpClient) { }

  cadastrarAula(idDisciplina: number, data: string): Observable<AulaDada> {
    const body = { data: data, observacoes: '' };
    return this.http.post<AulaDada>(`${this.apiUrl}/aula/disciplina/${idDisciplina}`, body);
  }

  salvarPresencas(idAulaDada: number, listaPresenca: PresencaDTO[]): Observable<any> {
    return this.http.post(`${this.apiUrl}/auladada/${idAulaDada}`, listaPresenca);
  }
}