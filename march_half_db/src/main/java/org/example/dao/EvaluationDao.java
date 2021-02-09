package org.example.dao;

import org.example.pojo.Evaluation;
import org.mybatis.spring.annotation.MapperScan;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
@MapperScan
public interface EvaluationDao {
    //增
    public int addEvaluation(Evaluation evaluation);
    //删
    public int delEvaluation(Integer evaluationId);
    //改
    public Integer updateEvaluation(Evaluation evaluation);
    //查
    public List<Evaluation> getAllEvaluation();
    public List<Evaluation> getAllEvaluationByUser(Integer userId);
    //照id查
    public Evaluation getEvaluationById(Integer evaluationId);
}