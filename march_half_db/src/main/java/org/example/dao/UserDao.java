package org.example.dao;

import org.example.pojo.User;
import org.mybatis.spring.annotation.MapperScan;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
@MapperScan
public interface UserDao {
    //增
    public int addUsers(User users);
    //删
    public int delUsers(Integer userId);
    //改
    public Integer updateUsers(User users);
    //查
    public List<User> getAllUsers(String keyWord);
    //照openid查
    public User getUserById(String openid);
}