package com.example.trabalhobackefront.model;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "disciplina")
public class Disciplina {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "professor_id")
    private Professor professor;

    @Column(nullable = false, unique = true)
    private String codigo;

    @Column(nullable = false)
    private String descricao;

    @Column(columnDefinition = "TEXT")
    private String ementa;
    private Boolean ativo = true;
}