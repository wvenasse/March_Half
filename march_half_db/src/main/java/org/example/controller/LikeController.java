package org.example.controller;
import com.alibaba.fastjson.JSON;
import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import org.example.dao.LikeDao;
import org.example.pojo.Like;
import org.example.pojo.R;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class LikeController {
    @Autowired
    LikeDao likeDao;
    @RequestMapping("/addLike")
    public R addLike(Like like) {
        int count = likeDao.addLike(like);
        //当添加成功时，count的值为被插入的数据的行数
        if (count > 0) {
            return R.ok();
        }
        else {
            return R.error("添加点赞失败！");
        }
    }

    @RequestMapping("/delLike")
    public R delLike(Integer likeId) {
        int count = likeDao.delLike(likeId);
        if (count > 0) {
            return R.ok();
        }
        else {
            return R.error("删除点赞失败！");
        }
    }

    @RequestMapping("/updateLike")
    public R updateLike(Like like) {
        Integer count = likeDao.updateLike(like);
        if (count == null) {
            return R.ok();
        }
        else {
            return R.error("修改点赞失败！");
        }
    }

    @RequestMapping(value = "/showAllLike", produces = "text/json;charset=UTF-8")
    public String showAllLike(@RequestParam("postId") Integer postId, @RequestParam("openid") String openid){
        List<Like> likes = likeDao.getAllLike(postId,openid);
        String likeJson = JSON.toJSONString(likes);
        return likeJson;
    }

    @ResponseBody
    @RequestMapping("/findAllLike")
    public R findAllLove(@RequestParam("pageIndex") int pageIndex,
                                      @RequestParam("pageSize") int pageSize,
                         @RequestParam("postId") Integer postId, @RequestParam("openid") String openid){
        PageHelper.startPage(pageIndex,pageSize);
        PageInfo<Like> pageInfo = new PageInfo(likeDao.getAllLike(postId,openid));
        return R.ok().put("pageInfo", pageInfo);
    }


    @RequestMapping(value = "/showLike", produces = "text/json;charset=UTF-8")
    public String showLikes(Integer likeId){
        Like like = likeDao.getLikeById(likeId);
        String likeJson = JSON.toJSONString(like);
        return likeJson;
    }


}
