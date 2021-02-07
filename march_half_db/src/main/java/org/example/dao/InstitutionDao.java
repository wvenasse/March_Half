package org.example.dao;

import org.example.pojo.Institution;
import org.mybatis.spring.annotation.MapperScan;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
@MapperScan
public interface InstitutionDao {
    //增
    public int addInstitution(Institution institution);
    //删
    public int delInstitution(Integer institutionId);
    //改
    public Integer updateInstitution(Institution institution);

    public Integer updateInstitutionLikeNum(Integer institutionId);
    public Integer updateInstitutionLoveNum(Integer institutionId);
    //查
    public List<Institution> getAllInstitution(String keyWord);
    //照id查
    public Institution getInstitutionById(Integer institutionId);
}