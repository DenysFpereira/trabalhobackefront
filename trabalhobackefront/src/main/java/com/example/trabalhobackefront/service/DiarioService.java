package com.example.trabalhobackefront.service;

import com.example.trabalhobackefront.dto.LancamentoBimestreDTO;
import com.example.trabalhobackefront.model.AlunoDisciplina;
import com.example.trabalhobackefront.model.SituacaoAluno;
import com.example.trabalhobackefront.repository.AlunoDisciplinaRepository;
import com.example.trabalhobackefront.repository.AulasDadasPresencasRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class DiarioService {

    @Autowired
    private AlunoDisciplinaRepository alunoDisciplinaRepository;

    @Autowired
    private AulasDadasPresencasRepository aulasDadasPresencasRepository;

    private static final double MEDIA_MINIMA_APROVACAO = 6.0;
    private static final int LIMITE_MAXIMO_FALTAS = 20;

    @Transactional
    public AlunoDisciplina atualizarPrimeiroBimestre(Long idAluno, Long idDisciplina, LancamentoBimestreDTO dto) {

        AlunoDisciplina matricula = buscarMatricula(idAluno, idDisciplina);
        matricula.setNota1Bim(dto.getNota());

        return alunoDisciplinaRepository.save(matricula);
    }

    @Transactional
    public AlunoDisciplina atualizarSegundoBimestre(Long idAluno, Long idDisciplina, LancamentoBimestreDTO dto) {

        AlunoDisciplina matricula = buscarMatricula(idAluno, idDisciplina);
        matricula.setNota2Bim(dto.getNota());

        calcularSituacaoFinal(matricula);

        return alunoDisciplinaRepository.save(matricula);
    }

    private void calcularSituacaoFinal(AlunoDisciplina matricula) {
        if (matricula.getNota1Bim() == null || matricula.getNota2Bim() == null) {
            matricula.setSituacao(SituacaoAluno.EM_CURSO);
            return;
        }

        Long alunoId = matricula.getAluno().getId();
        Long disciplinaId = matricula.getDisciplina().getId();

        double mediaFinal = (matricula.getNota1Bim() + matricula.getNota2Bim()) / 2.0;

        Integer totalFaltas =
                aulasDadasPresencasRepository.countFaltasByAlunoAndDisciplina(alunoId, disciplinaId);
        if (totalFaltas == null) {
            totalFaltas = 0;
        }

        matricula.setTotalFaltas(totalFaltas);

        if (totalFaltas > LIMITE_MAXIMO_FALTAS) {
            matricula.setSituacao(SituacaoAluno.REPROVADO);
            matricula.setMatriculado(true);
        } else if (mediaFinal >= MEDIA_MINIMA_APROVACAO) {
            matricula.setSituacao(SituacaoAluno.APROVADO);
            matricula.setMatriculado(false);
        } else {
            matricula.setSituacao(SituacaoAluno.REPROVADO);
            matricula.setMatriculado(true);
        }
    }

    private AlunoDisciplina buscarMatricula(Long idAluno, Long idDisciplina) {
        return alunoDisciplinaRepository.findByAlunoIdAndDisciplinaId(idAluno, idDisciplina)
                .orElseThrow(() -> new RuntimeException(
                        "Matrícula não encontrada. Aluno ID: " + idAluno +
                                ", Disciplina ID: " + idDisciplina));
    }

    public List<AlunoDisciplina> getAlunosPorDisciplina(Long disciplinaId) {
        List<AlunoDisciplina> matriculados =
                alunoDisciplinaRepository.findAllByDisciplinaId(disciplinaId);

        for (AlunoDisciplina item : matriculados) {
            Integer totalFaltas = aulasDadasPresencasRepository
                    .countFaltasByAlunoAndDisciplina(
                            item.getAluno().getId(),
                            item.getDisciplina().getId()
                    );

            if (totalFaltas == null) {
                totalFaltas = 0;
            }
            item.setTotalFaltas(totalFaltas);
        }

        return matriculados;
    }
}
