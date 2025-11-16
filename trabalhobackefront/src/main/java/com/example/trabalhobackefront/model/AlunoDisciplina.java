package com.example.trabalhobackefront.model;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "aluno_disciplina")
public class AlunoDisciplina {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "aluno_id")
    private Aluno aluno;

    @ManyToOne
    @JoinColumn(name = "disciplina_id")
    private Disciplina disciplina;

    private Double nota1Bim;
    private Double nota2Bim;

    private Integer totalFaltas;

    private Boolean matriculado = true;

    @Enumerated(EnumType.STRING)
    private SituacaoAluno situacao = SituacaoAluno.EM_CURSO;
}