package com.example.trabalhobackefront.repository;

import com.example.trabalhobackefront.model.AlunoDisciplina;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Optional;

@Repository
public interface AlunoDisciplinaRepository extends JpaRepository<AlunoDisciplina, Long> {

    Optional<AlunoDisciplina> findByAlunoIdAndDisciplinaId(Long alunoId, Long disciplinaId);

    List<AlunoDisciplina> findAllByAlunoId(Long alunoId);

    List<AlunoDisciplina> findAllByDisciplinaId(Long disciplinaId);

    boolean existsByAlunoIdAndDisciplinaId(Long alunoId, Long disciplinaId);
}