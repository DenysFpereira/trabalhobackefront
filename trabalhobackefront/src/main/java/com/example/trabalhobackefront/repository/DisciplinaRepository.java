package com.example.trabalhobackefront.repository;

import com.example.trabalhobackefront.model.Disciplina;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Optional;

@Repository
public interface DisciplinaRepository extends JpaRepository<Disciplina, Long> {

    Optional<Disciplina> findByCodigo(String codigo);

    List<Disciplina> findAllByProfessorId(Long professorId);

    List<Disciplina> findAllByAtivoTrue();
}