package org.example.dao;

import org.example.pojo.Post;
import org.mybatis.spring.annotation.MapperScan;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
@MapperScan
public interface PostDao {
    //增
    public int addPost(Post post);
    //删
    public int delPost(Integer postId);
    //改
    public Integer updatePost(Post post);
    //查
    public List<Post> getAllPost(String postType, String keyWord, Integer postTop, Integer postPop);

    public Post getPostById(Integer postId);
}