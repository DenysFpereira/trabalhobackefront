package com.example.trabalhobackefront.repository;

import com.example.trabalhobackefront.model.Professor;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List; // Importar List

@Repository
public interface ProfessorRepository extends JpaRepository<Professor, Long> {
    List<Professor> findAllByAtivoTrue();
}