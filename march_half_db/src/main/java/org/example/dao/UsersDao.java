package org.example.dao;
import org.example.pojo.Users;
import org.mybatis.spring.annotation.MapperScan;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
@MapperScan
public interface UsersDao {
    //增
    public int addUsers(Users users);
    //删
    public int delUsers(String openid);
    //改
    public int updateUsers(Users users);
    //查
    public List<Users> getAllUsers();
    public Users getUserById(String openid);
}