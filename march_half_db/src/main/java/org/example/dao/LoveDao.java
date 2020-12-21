package org.example.dao;

import org.apache.ibatis.annotations.Param;
import org.example.pojo.Love;
import org.mybatis.spring.annotation.MapperScan;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
@MapperScan
public interface LoveDao {
    //增
    public int addLove(Love love);
    //删
    public int delLove(Integer loveId);
    //改
    public Integer updateLove(Love love);
    //查
    public List<Love> getAllLove(String openid,String toOpenid,Integer toPostId);

    public Love getLoveById (Integer loveId);
}