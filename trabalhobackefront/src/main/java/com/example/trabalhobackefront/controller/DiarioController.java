package com.example.trabalhobackefront.controller;

import com.example.trabalhobackefront.dto.LancamentoBimestreDTO;
import com.example.trabalhobackefront.model.AlunoDisciplina;
import com.example.trabalhobackefront.service.DiarioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*")
public class DiarioController {

    @Autowired
    private DiarioService diarioService;
    @PutMapping("/aluno/{idAluno}/disciplina/{idDisciplina}/1bim")
    public ResponseEntity<AlunoDisciplina> lancarNotas1Bim(
            @PathVariable Long idAluno,
            @PathVariable Long idDisciplina,
            @RequestBody LancamentoBimestreDTO dto) {
        try {
            AlunoDisciplina matricula = diarioService.atualizarPrimeiroBimestre(idAluno, idDisciplina, dto);
            return ResponseEntity.ok(matricula);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }
    @PutMapping("/aluno/{idAluno}/disciplina/{idDisciplina}/2bim")
    public ResponseEntity<AlunoDisciplina> lancarNotas2Bim(
            @PathVariable Long idAluno,
            @PathVariable Long idDisciplina,
            @RequestBody LancamentoBimestreDTO dto) {
        try {
            AlunoDisciplina matricula = diarioService.atualizarSegundoBimestre(idAluno, idDisciplina, dto);
            return ResponseEntity.ok(matricula);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }
}