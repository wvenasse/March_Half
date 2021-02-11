package org.example.controller;

import com.alibaba.fastjson.JSON;
import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import org.example.dao.PostDao;
import org.example.pojo.Post;
import org.example.pojo.R;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class PostController {
    @Autowired
    PostDao postDao;

    @RequestMapping("/addPost")
    public R addPost(Post post) {
        int count = postDao.addPost(post);
        //当添加成功时，count的值为被插入的数据的行数
        System.out.println("总共插入了："+count+"条数据");
        if (count>0) {
            return R.ok();
        }
        else {
            return R.error("添加订单失败！");
        }
    }

    @RequestMapping("/delPost")
    public R delPost(Integer postId) {
        int count = postDao.delPost(postId);
        if (count>0) {
            return R.ok();
        }
        else {
            return R.error("删除订单失败！");
        }
    }

    @RequestMapping("/updatePost")
    public R updatePost(Post post) {
        Integer count = postDao.updatePost(post);
        if (count == null) {
            return R.ok();
        }
        else {
            return R.error("修改订单失败！");
        }
    }

    @RequestMapping(value = "/showAllPost", produces = "text/json;charset=UTF-8")
    public String showAllPost(){
        List<Post> post = postDao.getAllPost("");
        String postJson = JSON.toJSONString(post);
        return postJson;
    }
    @RequestMapping(value = "/showAllPostByType", produces = "text/json;charset=UTF-8")
    public String showAllPostByType(Integer typeId){
        List<Post> post = postDao.getAllPostByType(typeId);
        String postJson = JSON.toJSONString(post);
        return postJson;
    }
    @RequestMapping(value = "/showAllPostByUser", produces = "text/json;charset=UTF-8")
    public String showAllPostByUser(Integer userId){
        List<Post> post = postDao.getAllPostByUser(userId);
        String postJson = JSON.toJSONString(post);
        return postJson;
    }

    @ResponseBody
    @RequestMapping("/findAllPost")
    public R findAllOrder(@RequestParam("pageIndex") int pageIndex,
                          @RequestParam("pageSize") int pageSize,
                          @RequestParam("keyWord") String keyWord){
        PageHelper.startPage(pageIndex,pageSize);
        PageInfo<Post> pageInfo = new PageInfo(postDao.getAllPost(keyWord));
        return R.ok().put("pageInfo", pageInfo);
    }

    @RequestMapping(value = "/showPost", produces = "text/json;charset=UTF-8")
    public String showPost(Integer postId){
        Post post = postDao.getPostById(postId);
        String postJson = JSON.toJSONString(post);
        return postJson;
    }
}
