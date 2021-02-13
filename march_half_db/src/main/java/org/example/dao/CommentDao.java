package org.example.dao;

import org.example.pojo.Comment;
import org.mybatis.spring.annotation.MapperScan;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
@MapperScan
public interface CommentDao {
    //增
    public int addComment(Comment comment);
    //删
    public int delComment(Integer commentId);
    //改
    public Integer updateComment(Comment comment);
    public Integer updateCommentNum(Integer commentId);
    //查
    public List<Comment> getAllComment(String keyWord);
    public List<Comment> getAllCommentByUser(Integer userId);
    public List<Comment> getAllCommentByPost(Integer postId);
    public List<Comment> getAllCommentFirst(Integer postId);
    public List<Comment> getAllCommentSecond(Integer postId,Integer toCommentId);
    //照id查
    public Comment getCommentById(Integer commentId);
}