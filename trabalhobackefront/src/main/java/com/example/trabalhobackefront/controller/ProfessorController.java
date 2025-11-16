package com.example.trabalhobackefront.controller;

import com.example.trabalhobackefront.model.Professor;
import com.example.trabalhobackefront.service.ProfessorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/professor")
@CrossOrigin(origins = "*")
public class ProfessorController {

    @Autowired
    private ProfessorService professorService;

    @PostMapping
    public ResponseEntity<Professor> cadastrarProfessor(@RequestBody Professor professor) {
        Professor novoProfessor = professorService.criarProfessor(professor);
        return new ResponseEntity<>(novoProfessor, HttpStatus.CREATED);
    }

    @GetMapping("/todos")
    public ResponseEntity<List<Professor>> listarTodosProfessores() {
        return ResponseEntity.ok(professorService.listarProfessoresAtivos());
    }

    @GetMapping("/id/{id}")
    public ResponseEntity<Professor> buscarProfessorPorId(@PathVariable Long id) {
        return professorService.buscarProfessorPorId(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PutMapping("/{id}")
    public ResponseEntity<Professor> atualizarProfessor(@PathVariable Long id, @RequestBody Professor professor) {
        try {
            Professor profAtualizado = professorService.atualizarProfessor(id, professor);
            return ResponseEntity.ok(profAtualizado);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @PutMapping("/{id}/inativar")
    public ResponseEntity<Void> inativarProfessor(@PathVariable Long id) {
        try {
            professorService.inativarProfessor(id);
            return ResponseEntity.noContent().build();
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }
    @PutMapping("/{id}/reativar")
    public ResponseEntity<Void> reativarProfessor(@PathVariable Long id) {
        try {
            professorService.reativarProfessor(id);
            return ResponseEntity.noContent().build();
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }
}