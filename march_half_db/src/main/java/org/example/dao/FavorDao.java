package org.example.dao;

import org.example.pojo.Favor;
import org.mybatis.spring.annotation.MapperScan;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
@MapperScan
public interface FavorDao {
    //增
    public int addFavor(Favor favor);
    //删
    public int delFavor(Integer favorId);
    //改
    public Integer updateFavor(Favor favor);
    //查
    public List<Favor> getAllFavor(Integer favorType,Integer userId);

    public Favor getFavorById(Integer favorId);

}