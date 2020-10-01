package org.example.dao;

import org.apache.ibatis.annotations.Param;
import org.mybatis.spring.annotation.MapperScan;
import org.springframework.stereotype.Repository;

@Repository
@MapperScan
public interface UserDao {
    public int getUserByLoginId(@Param("userId") String userId, @Param("password") String password);
}