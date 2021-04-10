package org.example.dao;

import org.example.pojo.Inform;
import org.mybatis.spring.annotation.MapperScan;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
@MapperScan
public interface InformDao {
    //增
    public int addInform(Inform inform);
    //删
    public int delInform(Integer informId);
    //改
    public Integer updateInform(Inform inform);
    //查
    public List<Inform> getAllInform(String keyWord);

    public Inform getInformById(Integer informId);
}