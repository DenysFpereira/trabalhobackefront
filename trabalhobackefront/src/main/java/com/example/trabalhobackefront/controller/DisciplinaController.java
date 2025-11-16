package com.example.trabalhobackefront.controller;

import com.example.trabalhobackefront.model.AlunoDisciplina;
import com.example.trabalhobackefront.model.Disciplina;
import com.example.trabalhobackefront.repository.AlunoDisciplinaRepository;
import com.example.trabalhobackefront.service.DiarioService;
import com.example.trabalhobackefront.service.DisciplinaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/disciplina")
@CrossOrigin(origins = "*")
public class DisciplinaController {

    @Autowired
    private DisciplinaService disciplinaService;

    @Autowired
    private DiarioService diarioService;

    @Autowired
    private AlunoDisciplinaRepository alunoDisciplinaRepository;

    @PostMapping
    public ResponseEntity<Disciplina> cadastrarDisciplina(@RequestBody Disciplina disciplina) {
        Disciplina novaDisciplina = disciplinaService.criarDisciplina(disciplina);
        return new ResponseEntity<>(novaDisciplina, HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Disciplina> atualizarDisciplina(@PathVariable Long id, @RequestBody Disciplina disciplina) {
        try {
            Disciplina disciplinaAtualizada = disciplinaService.atualizarDisciplina(id, disciplina);
            return ResponseEntity.ok(disciplinaAtualizada);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/codigo/{codigo}")
    public ResponseEntity<Disciplina> buscarPorCodigo(@PathVariable String codigo) {
        return disciplinaService.buscarPorCodigo(codigo)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/todos")
    public ResponseEntity<List<Disciplina>> listarTodasDisciplinas() {
        return ResponseEntity.ok(disciplinaService.listarTodasDisciplinas());
    }

    @GetMapping("/id/{id}")
    public ResponseEntity<Disciplina> buscarPorId(@PathVariable Long id) {
        return disciplinaService.buscarDisciplinaPorId(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/professor/{professorId}")
    public ResponseEntity<List<Disciplina>> listarPorProfessor(@PathVariable Long professorId) {
        return ResponseEntity.ok(disciplinaService.listarDisciplinasPorProfessor(professorId));
    }

    @GetMapping("/{idDisciplina}/matriculados")
    public ResponseEntity<List<AlunoDisciplina>> listarAlunosMatriculados(@PathVariable Long idDisciplina) {
        List<AlunoDisciplina> matriculados = diarioService.getAlunosPorDisciplina(idDisciplina);
        return ResponseEntity.ok(matriculados);
    }

    @PutMapping("/{id}/inativar")
    public ResponseEntity<Void> inativarDisciplina(@PathVariable Long id) {
        try {
            disciplinaService.inativarDisciplina(id);
            return ResponseEntity.noContent().build();
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @PutMapping("/{id}/reativar")
    public ResponseEntity<Void> reativarDisciplina(@PathVariable Long id) {
        try {
            disciplinaService.reativarDisciplina(id);
            return ResponseEntity.noContent().build();
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }
}