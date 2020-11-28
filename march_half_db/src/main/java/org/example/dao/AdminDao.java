package org.example.dao;

import org.apache.ibatis.annotations.Param;
import org.mybatis.spring.annotation.MapperScan;
import org.springframework.stereotype.Repository;
import org.example.pojo.Admin;
import java.util.List;

@Repository
@MapperScan
public interface AdminDao {
    //增
    public int addAdmin(Admin user);
    //删
    public int delAdmin(Integer rootId);
    //改
    public Integer updateAdmin(Admin user);
    //查
    public List<Admin> getAllAdmin(String keyWord);

    public int getAdmin(@Param("userName") String userName, @Param("password") String password);

    public Admin getAdminByName(String userName);
}