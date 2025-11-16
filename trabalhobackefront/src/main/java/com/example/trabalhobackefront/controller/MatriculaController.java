package com.example.trabalhobackefront.controller;

import com.example.trabalhobackefront.dto.MatriculaDTO;
import com.example.trabalhobackefront.model.AlunoDisciplina;
import com.example.trabalhobackefront.service.MatriculaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/matricula")
@CrossOrigin(origins = "*")
public class MatriculaController {

    @Autowired
    private MatriculaService matriculaService;

    @PostMapping
    public ResponseEntity<AlunoDisciplina> matricular(@RequestBody MatriculaDTO matriculaDTO) {
        try {
            AlunoDisciplina novaMatricula = matriculaService.matricularAluno(matriculaDTO);
            return new ResponseEntity<>(novaMatricula, HttpStatus.CREATED);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(null);
        }
    }
}