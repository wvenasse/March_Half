package org.example.controller;

import com.alibaba.fastjson.JSON;
import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import org.example.dao.CommentDao;
import org.example.pojo.Comment;
import org.example.pojo.R;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class CommentController {
    @Autowired
    CommentDao commentDao;

    @RequestMapping("/addComment")
    public R addComment(Comment comment) {
        int count = commentDao.addComment(comment);
        //当添加成功时，count的值为被插入的数据的行数
        System.out.println("总共插入了："+count+"条数据");
        if (count>0) {
            return R.ok();
        }
        else {
            return R.error("添加讨论失败！");
        }
    }

    @RequestMapping("/delComment")
    public R delComment(Integer commentId) {
        int count = commentDao.delComment(commentId);
        if (count>0) {
            return R.ok();
        }
        else {
            return R.error("删除讨论失败！");
        }
    }

    @RequestMapping("/updateComment")
    public R updateComment(Comment comment) {
        Integer count = commentDao.updateComment(comment);
        if (count == null) {
            return R.ok();
        }
        else {
            return R.error("修改讨论失败！");
        }
    }

    @RequestMapping("/updateCommentNum")
    public R updateCommentNum(Integer commentId) {
        Integer count = commentDao.updateCommentNum(commentId);
        if (count == null) {
            return R.ok();
        }
        else {
            return R.error("修改讨论失败！");
        }
    }

    @RequestMapping(value = "/showAllComment", produces = "text/json;charset=UTF-8")
    public String showAllComment(){
        List<Comment> comment = commentDao.getAllComment("");
        String commentJson = JSON.toJSONString(comment);
        return commentJson;
    }
    @RequestMapping(value = "/showAllCommentByUser", produces = "text/json;charset=UTF-8")
    public String showAllCommentByUser(Integer userId){
        List<Comment> comment = commentDao.getAllCommentByUser(userId);
        String commentJson = JSON.toJSONString(comment);
        return commentJson;
    }
    @RequestMapping(value = "/showAllCommentByPost", produces = "text/json;charset=UTF-8")
    public String showAllCommentByPost(Integer postId){
        List<Comment> comment = commentDao.getAllCommentByPost(postId);
        String commentJson = JSON.toJSONString(comment);
        return commentJson;
    }
    @RequestMapping(value = "/showAllCommentFirst", produces = "text/json;charset=UTF-8")
    public String showAllCommentFirst(Integer postId){
        List<Comment> comment = commentDao.getAllCommentFirst(postId);
        String commentJson = JSON.toJSONString(comment);
        return commentJson;
    }
    @RequestMapping(value = "/showAllCommentSecond", produces = "text/json;charset=UTF-8")
    public String showAllCommentSecond(Integer postId,Integer toCommentId){
        List<Comment> comment = commentDao.getAllCommentSecond(postId,toCommentId);
        String commentJson = JSON.toJSONString(comment);
        return commentJson;
    }

    @ResponseBody
    @RequestMapping("/findAllComment")
    public R findAllComment(@RequestParam("pageIndex") int pageIndex,
                          @RequestParam("pageSize") int pageSize,
                          @RequestParam("keyWord") String keyWord){
        PageHelper.startPage(pageIndex,pageSize);
        PageInfo<Comment> pageInfo = new PageInfo(commentDao.getAllComment(keyWord));
        return R.ok().put("pageInfo", pageInfo);
    }

    @ResponseBody
    @RequestMapping("/findAllCommentFirst")
    public R findAllCommentFirst(@RequestParam("pageIndex") int pageIndex,
                          @RequestParam("pageSize") int pageSize,
                          @RequestParam("postId") Integer postId){
        PageHelper.startPage(pageIndex,pageSize);
        PageInfo<Comment> pageInfo = new PageInfo(commentDao.getAllCommentFirst(postId));
        return R.ok().put("pageInfo", pageInfo);
    }

    @ResponseBody
    @RequestMapping("/findAllCommentSecond")
    public R findAllCommentSecond(@RequestParam("pageIndex") int pageIndex,
                                 @RequestParam("pageSize") int pageSize,
                                 @RequestParam("postId") Integer postId,
                                  @RequestParam("toCommentId") Integer toCommentId){
        PageHelper.startPage(pageIndex,pageSize);
        PageInfo<Comment> pageInfo = new PageInfo(commentDao.getAllCommentSecond(postId,toCommentId));
        return R.ok().put("pageInfo", pageInfo);
    }

    @RequestMapping(value = "/showComment", produces = "text/json;charset=UTF-8")
    public String showComment(Integer commentId){
        Comment comment = commentDao.getCommentById(commentId);
        String commentJson = JSON.toJSONString(comment);
        return commentJson;
    }
}
