package com.example.trabalhobackefront.repository;

import com.example.trabalhobackefront.model.AulasDadasPresencas;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface AulasDadasPresencasRepository extends JpaRepository<AulasDadasPresencas, Long> {

    @Query("SELECT COUNT(p) FROM AulasDadasPresencas p " +
            "JOIN p.aulaDada ad " +
            "WHERE p.aluno.id = :alunoId " +
            "AND ad.disciplina.id = :disciplinaId " +
            "AND p.falta = true")
    Integer countFaltasByAlunoAndDisciplina(
            @Param("alunoId") Long alunoId,
            @Param("disciplinaId") Long disciplinaId
    );
}