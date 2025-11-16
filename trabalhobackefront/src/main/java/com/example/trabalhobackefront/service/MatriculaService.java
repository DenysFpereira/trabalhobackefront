package com.example.trabalhobackefront.service;

import com.example.trabalhobackefront.dto.MatriculaDTO;
import com.example.trabalhobackefront.model.Aluno;
import com.example.trabalhobackefront.model.AlunoDisciplina;
import com.example.trabalhobackefront.model.Disciplina;
import com.example.trabalhobackefront.model.SituacaoAluno;
import com.example.trabalhobackefront.repository.AlunoDisciplinaRepository;
import com.example.trabalhobackefront.repository.AlunoRepository;
import com.example.trabalhobackefront.repository.DisciplinaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class MatriculaService {

    @Autowired
    private AlunoDisciplinaRepository alunoDisciplinaRepository;

    @Autowired
    private AlunoRepository alunoRepository;

    @Autowired
    private DisciplinaRepository disciplinaRepository;

    @Transactional
    public AlunoDisciplina matricularAluno(MatriculaDTO matriculaDTO) {

        Long alunoId = matriculaDTO.getAlunoId();
        Long disciplinaId = matriculaDTO.getDisciplinaId();
        if (alunoDisciplinaRepository.existsByAlunoIdAndDisciplinaId(alunoId, disciplinaId)) {
            throw new RuntimeException("Este aluno já está matriculado nesta disciplina.");
        }

        Aluno aluno = alunoRepository.findById(alunoId)
                .orElseThrow(() -> new RuntimeException("Aluno não encontrado"));

        Disciplina disciplina = disciplinaRepository.findById(disciplinaId)
                .orElseThrow(() -> new RuntimeException("Disciplina não encontrada"));
        AlunoDisciplina novaMatricula = new AlunoDisciplina();
        novaMatricula.setAluno(aluno);
        novaMatricula.setDisciplina(disciplina);
        novaMatricula.setMatriculado(true);
        novaMatricula.setSituacao(SituacaoAluno.EM_CURSO);
        return alunoDisciplinaRepository.save(novaMatricula);
    }
}