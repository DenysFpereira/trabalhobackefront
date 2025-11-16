import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-aluno-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './aluno-login.html',
  styleUrl: './aluno-login.css'
})
export class AlunoLoginComponent {
  
  ra: string = '';
  
  private router = inject(Router);

  buscarBoletim() {
    if (this.ra.trim() === '') {
      alert('Por favor, digite seu RA.');
      return;
    }
    this.router.navigate(['/aluno-boletim', this.ra]);
  }
}