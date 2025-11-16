package com.example.trabalhobackefront.service;

import com.example.trabalhobackefront.dto.PresencaDTO;
import com.example.trabalhobackefront.model.Aluno;
import com.example.trabalhobackefront.model.AulasDadas;
import com.example.trabalhobackefront.model.AulasDadasPresencas;
import com.example.trabalhobackefront.model.Disciplina;
import com.example.trabalhobackefront.repository.AlunoRepository;
import com.example.trabalhobackefront.repository.AulasDadasPresencasRepository;
import com.example.trabalhobackefront.repository.AulasDadasRepository;
import com.example.trabalhobackefront.repository.DisciplinaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Service
public class AulasService {

    @Autowired
    private AulasDadasRepository aulasDadasRepository;
    @Autowired
    private AulasDadasPresencasRepository presencasRepository;
    @Autowired
    private DisciplinaRepository disciplinaRepository;
    @Autowired
    private AlunoRepository alunoRepository;

    @Transactional
    public AulasDadas cadastrarAula(Long idDisciplina, AulasDadas aula) {
        Disciplina disciplina = disciplinaRepository.findById(idDisciplina)
                .orElseThrow(() -> new RuntimeException("Disciplina não encontrada"));

        aula.setDisciplina(disciplina);

        return aulasDadasRepository.save(aula);
    }

    @Transactional
    public List<AulasDadasPresencas> registrarPresencas(Long idAulaDada, List<PresencaDTO> presencasDTO) {
        AulasDadas aula = aulasDadasRepository.findById(idAulaDada)
                .orElseThrow(() -> new RuntimeException("Aula (AulasDadas) não encontrada"));

        List<AulasDadasPresencas> listaDePresencaParaSalvar = new ArrayList<>();

        for (PresencaDTO dto : presencasDTO) {
            Aluno aluno = alunoRepository.findById(dto.getAlunoId())
                    .orElseThrow(() -> new RuntimeException("Aluno não encontrado com ID: " + dto.getAlunoId()));

            AulasDadasPresencas presenca = new AulasDadasPresencas();
            presenca.setAulaDada(aula);
            presenca.setAluno(aluno);
            presenca.setFalta(dto.getFalta());

            listaDePresencaParaSalvar.add(presenca);
        }

        return presencasRepository.saveAll(listaDePresencaParaSalvar);
    }
}