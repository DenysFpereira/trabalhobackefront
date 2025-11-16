package com.example.trabalhobackefront.repository;

import com.example.trabalhobackefront.model.AulasDadas;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AulasDadasRepository extends JpaRepository<AulasDadas, Long> {
}