import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { AlunoService } from '../services/aluno.service';
import { AlunoDisciplina } from '../models/escola.models';

@Component({
  selector: 'app-aluno-boletim',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './aluno-boletim.html',
  styleUrl: './aluno-boletim.css'
})
export class AlunoBoletimComponent implements OnInit {

  ra: string | null = null;
  boletim: AlunoDisciplina[] = [];
  alunoNome: string = '';
  erro: string | null = null;

  private route = inject(ActivatedRoute);
  private alunoService = inject(AlunoService);

  ngOnInit(): void {
    this.ra = this.route.snapshot.paramMap.get('ra');
    if (this.ra) {
      this.carregarBoletim(this.ra);
    }
  }

  carregarBoletim(ra: string) {
    this.alunoService.getBoletimPorRa(ra).subscribe({
      next: (dados) => {
        if (dados.length > 0) {
          this.alunoNome = dados[0].aluno.nome;
        } else {
          this.alunoNome = `Aluno (RA: ${ra})`;
        }
        this.boletim = dados;
        this.erro = null;
      },
      error: (err) => {
        console.error("Erro ao buscar boletim", err);
        this.erro = `RA "${ra}" não encontrado. Verifique o número e tente novamente.`;
        this.alunoNome = 'Erro';
      }
    });
  }

  calcularMedia(item: AlunoDisciplina): number | string {
    const n1 = item.nota1Bim;
    const n2 = item.nota2Bim;
    
    if (n1 !== null && n2 !== null) {
      return (Number(n1) + Number(n2)) / 2;
    }
    return '--';
  }
}