package com.example.trabalhobackefront.model;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "aluno")
public class Aluno {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String nome;

    @Column(nullable = false, unique = true)
    private String cpf;

    @Column(nullable = false, unique = true)
    private String ra;

    private Integer anoIngresso;

    private Integer periodoAtual;
    private Boolean ativo = true;
}