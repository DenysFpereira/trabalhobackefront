package com.example.trabalhobackefront.service;

import com.example.trabalhobackefront.model.Aluno;
import com.example.trabalhobackefront.model.AlunoDisciplina;
import com.example.trabalhobackefront.repository.AlunoDisciplinaRepository;
import com.example.trabalhobackefront.repository.AlunoRepository;
import com.example.trabalhobackefront.repository.AulasDadasPresencasRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
public class AlunoService {

    @Autowired
    private AlunoRepository alunoRepository;

    @Autowired
    private AlunoDisciplinaRepository alunoDisciplinaRepository;

    @Autowired
    private AulasDadasPresencasRepository aulasDadasPresencasRepository;

    @Transactional
    public Aluno criarAluno(Aluno aluno) {
        aluno.setAtivo(true);
        return alunoRepository.save(aluno);
    }

    public List<Aluno> listarTodosAlunos() {
        return alunoRepository.findAll();
    }

    public Optional<Aluno> buscarAlunoPorId(Long id) {
        return alunoRepository.findById(id);
    }

    @Transactional
    public Aluno atualizarAluno(Long id, Aluno alunoAtualizado) {
        Aluno alunoExistente = alunoRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Aluno não encontrado com ID: " + id));

        alunoExistente.setNome(alunoAtualizado.getNome());
        alunoExistente.setCpf(alunoAtualizado.getCpf());
        alunoExistente.setRa(alunoAtualizado.getRa());
        alunoExistente.setAnoIngresso(alunoAtualizado.getAnoIngresso());
        alunoExistente.setPeriodoAtual(alunoAtualizado.getPeriodoAtual());

        return alunoRepository.save(alunoExistente);
    }

    @Transactional
    public void inativarAluno(Long id) {
        Aluno aluno = alunoRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Aluno não encontrado com ID: " + id));

        aluno.setAtivo(false);
        alunoRepository.save(aluno);
    }

    @Transactional
    public void reativarAluno(Long id) {
        Aluno aluno = alunoRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Aluno não encontrado com ID: " + id));

        aluno.setAtivo(true);
        alunoRepository.save(aluno);
    }

    public List<AlunoDisciplina> buscarBoletimPorRa(String ra) {
        Aluno aluno = alunoRepository.findByRa(ra)
                .orElseThrow(() -> new RuntimeException("Aluno não encontrado com RA: " + ra));

        List<AlunoDisciplina> boletim = alunoDisciplinaRepository.findAllByAlunoId(aluno.getId());

        for (AlunoDisciplina item : boletim) {
            Integer totalFaltas = aulasDadasPresencasRepository
                    .countFaltasByAlunoAndDisciplina(item.getAluno().getId(), item.getDisciplina().getId());

            if (totalFaltas == null) {
                totalFaltas = 0;
            }
            item.setTotalFaltas(totalFaltas);
        }

        return boletim;
    }
}