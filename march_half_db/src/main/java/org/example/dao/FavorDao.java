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

    public Favor isFavorService(Integer favorType,Integer userId,Integer serviceId);
    public Favor isFavorInstitution(Integer favorType,Integer userId,Integer institutionId);
    public Favor isFavorPost(Integer favorType,Integer userId,Integer postId);

    public List<Favor>  isFavorServiceNum(Integer favorType,Integer serviceId);
    public List<Favor>  isFavorInstitutionNum(Integer favorType,Integer institutionId);
    public List<Favor>  isFavorPostNum(Integer favorType,Integer postId);
}