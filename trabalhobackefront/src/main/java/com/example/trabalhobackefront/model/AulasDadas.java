package com.example.trabalhobackefront.model;

import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDate;

@Data
@Entity
@Table(name = "aulas_dadas")
public class AulasDadas {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "disciplina_id")
    private Disciplina disciplina;
    private LocalDate data; // Armazena a data da aula (ex: 2025-11-12)
    private String observacoes;
}