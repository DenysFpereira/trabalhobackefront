package com.example.trabalhobackefront.service;

import com.example.trabalhobackefront.model.Professor;
import com.example.trabalhobackefront.repository.ProfessorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;
import java.util.Optional;

@Service
public class ProfessorService {

    @Autowired
    private ProfessorRepository professorRepository;

    @Transactional
    public Professor criarProfessor(Professor professor) {
        professor.setAtivo(true);
        return professorRepository.save(professor);
    }

    public List<Professor> listarProfessoresAtivos() {
        return professorRepository.findAllByAtivoTrue();
    }

    public Optional<Professor> buscarProfessorPorId(Long id) {
        return professorRepository.findById(id);
    }

    @Transactional
    public Professor atualizarProfessor(Long id, Professor professorAtualizado) {
        Professor profExistente = professorRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Professor não encontrado com ID: " + id));

        profExistente.setNome(professorAtualizado.getNome());
        profExistente.setCpf(professorAtualizado.getCpf());
        profExistente.setMatricula(professorAtualizado.getMatricula());

        return professorRepository.save(profExistente);
    }

    @Transactional
    public void inativarProfessor(Long id) {
        Professor prof = professorRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Professor não encontrado com ID: " + id));

        prof.setAtivo(false);
        professorRepository.save(prof);
    }
    @Transactional
    public void reativarProfessor(Long id) {
        Professor prof = professorRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Professor não encontrado com ID: " + id));

        prof.setAtivo(true);
        professorRepository.save(prof);
    }
}