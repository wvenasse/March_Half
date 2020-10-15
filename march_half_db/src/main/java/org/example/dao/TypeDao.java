package org.example.dao;

import org.apache.ibatis.annotations.Param;
import org.example.pojo.Type;
import org.mybatis.spring.annotation.MapperScan;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
@MapperScan
public interface TypeDao {
    //增
    public int addType(Type type);
    //删
    public int delType(Integer typeId);
    //改
    public Integer updateType(Type type);
    //查
    public List<Type> getAllType();

    public Type getUserByTypeId(Integer typeId);
}