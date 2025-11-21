import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { BackUpStartService } from './backup.service';
import { catchError, finalize } from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
  selector: 'app-backup-banco',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './backup-banco.html',
  styleUrls: ['./backup-banco.css']
})
export class BackupBancoComponent {
  private backupService = inject(BackUpStartService);
  isLoading = false;
  statusMessage = '';

  iniciarBackup() {
  this.isLoading = true;
  this.statusMessage = 'Iniciando backup...';
  
  this.backupService.triggerBackup().subscribe({
    next: (response: string) => {
      this.statusMessage = response; // This will show the plain text response
    },
    error: (error) => {
      this.statusMessage = 'Erro ao realizar backup: ' + (error.error || error.message || 'Erro desconhecido');
    },
    complete: () => {
      this.isLoading = false;
    }
  });
}}