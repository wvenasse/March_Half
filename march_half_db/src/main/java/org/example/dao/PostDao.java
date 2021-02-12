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
    public Integer updatePostTop(String postTop,Integer postId);
    public Integer updatePostPop(String postPop,Integer postId);
    //查
    public List<Post> getAllPost(String keyWord);
    public List<Post> getAllPostByUser(Integer userId);
    public List<Post> getAllPostByType(Integer typeId);
    //照id查
    public Post getPostById(Integer postId);
}