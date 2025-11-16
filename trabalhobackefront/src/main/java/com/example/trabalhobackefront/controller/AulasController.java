package com.example.trabalhobackefront.controller;

import com.example.trabalhobackefront.dto.PresencaDTO;
import com.example.trabalhobackefront.model.AulasDadas;
import com.example.trabalhobackefront.model.AulasDadasPresencas;
import com.example.trabalhobackefront.service.AulasService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*")
public class AulasController {

    @Autowired
    private AulasService aulasService;

    @PostMapping("/aula/disciplina/{idDisciplina}")
    public ResponseEntity<AulasDadas> cadastrarAula(@PathVariable Long idDisciplina, @RequestBody AulasDadas aula) {
        try {
            AulasDadas novaAula = aulasService.cadastrarAula(idDisciplina, aula);
            return new ResponseEntity<>(novaAula, HttpStatus.CREATED);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping("/auladada/{idAulaDada}")
    public ResponseEntity<List<AulasDadasPresencas>> registrarPresencas(
            @PathVariable Long idAulaDada,
            @RequestBody List<PresencaDTO> listaDePresenca) {
        try {
            List<AulasDadasPresencas> resultado = aulasService.registrarPresencas(idAulaDada, listaDePresenca);
            return new ResponseEntity<>(resultado, HttpStatus.CREATED);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(null);
        }
    }
}