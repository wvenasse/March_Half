package org.example.dao;

import org.example.pojo.Like;
import org.mybatis.spring.annotation.MapperScan;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
@MapperScan
public interface LikeDao {
    //增
    public int addLike(Like like);
    //删
    public int delLike(Integer likeId);
    //改
    public Integer updateLike(Like like);
    //查
    public List<Like> getAllLike(Integer postId , String openid);

    public Like getLikeById(Integer likeId);
}