package com.example.trabalhobackefront.service;

import com.example.trabalhobackefront.model.Disciplina;
import com.example.trabalhobackefront.model.Professor;
import com.example.trabalhobackefront.repository.DisciplinaRepository;
import com.example.trabalhobackefront.repository.ProfessorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
public class DisciplinaService {

    @Autowired
    private DisciplinaRepository disciplinaRepository;

    @Autowired
    private ProfessorRepository professorRepository;

    @Transactional
    public Disciplina criarDisciplina(Disciplina disciplina) {
        disciplina.setAtivo(true);
        if (disciplina.getProfessor() != null && disciplina.getProfessor().getId() != null) {
            Professor professor = professorRepository.findById(disciplina.getProfessor().getId())
                    .orElseThrow(() -> new RuntimeException("Professor não encontrado"));
            disciplina.setProfessor(professor);
        }
        return disciplinaRepository.save(disciplina);
    }

    @Transactional
    public Disciplina atualizarDisciplina(Long id, Disciplina disciplinaAtualizada) {
        Disciplina disciplinaExistente = disciplinaRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Disciplina não encontrada com ID: " + id));

        disciplinaExistente.setCodigo(disciplinaAtualizada.getCodigo());
        disciplinaExistente.setDescricao(disciplinaAtualizada.getDescricao());
        disciplinaExistente.setEmenta(disciplinaAtualizada.getEmenta());

        if (disciplinaAtualizada.getProfessor() != null && disciplinaAtualizada.getProfessor().getId() != null) {
            Professor professor = professorRepository.findById(disciplinaAtualizada.getProfessor().getId())
                    .orElseThrow(() -> new RuntimeException("Professor não encontrado"));
            disciplinaExistente.setProfessor(professor);
        }

        return disciplinaRepository.save(disciplinaExistente);
    }

    public Optional<Disciplina> buscarPorCodigo(String codigo) {
        return disciplinaRepository.findByCodigo(codigo);
    }
    public List<Disciplina> listarTodasDisciplinas() {
        return disciplinaRepository.findAll(); // MUDADO DE findAllByAtivoTrue()
    }

    public List<Disciplina> listarDisciplinasPorProfessor(Long professorId) {
        return disciplinaRepository.findAllByProfessorId(professorId);
    }

    @Transactional
    public void inativarDisciplina(Long id) {
        Disciplina disciplina = disciplinaRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Disciplina não encontrada com ID: " + id));

        disciplina.setAtivo(false);
        disciplinaRepository.save(disciplina);
    }

    @Transactional
    public void reativarDisciplina(Long id) {
        Disciplina disciplina = disciplinaRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Disciplina não encontrada com ID: " + id));

        disciplina.setAtivo(true);
        disciplinaRepository.save(disciplina);
    }

    public Optional<Disciplina> buscarDisciplinaPorId(Long id) {
        return disciplinaRepository.findById(id);
    }
}