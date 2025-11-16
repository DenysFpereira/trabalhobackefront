package com.example.trabalhobackefront.model;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "aulas_dadas_presencas")
public class AulasDadasPresencas {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "aula_dada_id")
    private AulasDadas aulaDada;
    @ManyToOne
    @JoinColumn(name = "aluno_id")
    private Aluno aluno;

    private Boolean falta = false;
}