import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface MatriculaDTO {
  alunoId: number;
  disciplinaId: number;
}

@Injectable({
  providedIn: 'root'
})
export class MatriculaService {

  private readonly apiUrl = 'http://localhost:8080/api/matricula';

  constructor(private http: HttpClient) { }

  matricular(dados: MatriculaDTO): Observable<any> {
    return this.http.post(this.apiUrl, dados);
  }
}