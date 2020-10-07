package org.example.dao;

import org.apache.ibatis.annotations.Param;
import org.example.pojo.User;
import org.example.pojo.Users;
import org.mybatis.spring.annotation.MapperScan;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
@MapperScan
public interface UserDao {
    //增
    public int addUser(User user);
    //删
    public int delUser(String userName);
    //改
    public Integer updateUser(User user);
    //查
    public List<User> getAllUser();

    public int getUserByName(@Param("userName") String userName, @Param("password") String password);

    public User getUserByUserName(String userName);
}