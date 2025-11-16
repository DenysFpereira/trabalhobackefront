package com.example.trabalhobackefront.controller;

import com.example.trabalhobackefront.model.Aluno;
import com.example.trabalhobackefront.model.AlunoDisciplina;
import com.example.trabalhobackefront.repository.AlunoDisciplinaRepository;
import com.example.trabalhobackefront.service.AlunoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/aluno")
@CrossOrigin(origins = "*")
public class AlunoController {

    @Autowired
    private AlunoService alunoService;

    @Autowired
    private AlunoDisciplinaRepository alunoDisciplinaRepository;

    @PostMapping
    public ResponseEntity<Aluno> cadastrarAluno(@RequestBody Aluno aluno) {
        Aluno novoAluno = alunoService.criarAluno(aluno);
        return new ResponseEntity<>(novoAluno, HttpStatus.CREATED);
    }

    @GetMapping("/todos")
    public ResponseEntity<List<Aluno>> listarTodosAlunos() {
        return ResponseEntity.ok(alunoService.listarTodosAlunos());
    }

    @GetMapping("/id/{id}")
    public ResponseEntity<Aluno> buscarAlunoPorId(@PathVariable Long id) {
        return alunoService.buscarAlunoPorId(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PutMapping("/{id}")
    public ResponseEntity<Aluno> atualizarAluno(@PathVariable Long id, @RequestBody Aluno aluno) {
        try {
            Aluno alunoAtualizado = alunoService.atualizarAluno(id, aluno);
            return ResponseEntity.ok(alunoAtualizado);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/{id}/boletim")
    public ResponseEntity<List<AlunoDisciplina>> getBoletimDoAluno(@PathVariable Long id) {
        List<AlunoDisciplina> boletim = alunoDisciplinaRepository.findAllByAlunoId(id);
        return ResponseEntity.ok(boletim);
    }

    @PutMapping("/{id}/inativar")
    public ResponseEntity<Void> inativarAluno(@PathVariable Long id) {
        try {
            alunoService.inativarAluno(id);
            return ResponseEntity.noContent().build();
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @PutMapping("/{id}/reativar")
    public ResponseEntity<Void> reativarAluno(@PathVariable Long id) {
        try {
            alunoService.reativarAluno(id);
            return ResponseEntity.noContent().build();
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/ra/{ra}/boletim")
    public ResponseEntity<List<AlunoDisciplina>> getBoletimDoAlunoPorRa(@PathVariable String ra) {
        try {
            List<AlunoDisciplina> boletim = alunoService.buscarBoletimPorRa(ra);
            return ResponseEntity.ok(boletim);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }
}