package org.example.dao;

import org.example.pojo.Power;
import org.mybatis.spring.annotation.MapperScan;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
@MapperScan
public interface PowerDao {
    //增
    public int addPower(Power power);
    //删
    public int delPower(Integer powerId);
    //改
    public Integer updatePower(Power power);
    //查
    public List<Power> getAllPower(String keyWord);

    public Power getPower(Integer powerId);
}