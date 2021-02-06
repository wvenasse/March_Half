package org.example.controller;
import com.alibaba.fastjson.JSON;
import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import org.example.dao.UserDao;
import org.example.pojo.Admin;
import org.example.pojo.R;
import org.example.pojo.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class UserController {
    //微信小程序的用户
    @Autowired
    UserDao usersDao;

    @RequestMapping("/addUsers")
    public R addUsers(User users) {
        int count = usersDao.addUsers(users);
        //当添加成功时，count的值为被插入的数据的行数
        System.out.println("总共插入了："+count+"条数据");
        if (count>0) {
            return R.ok();
        }
        else {
            return R.error("添加用户失败！");
        }
    }

    @RequestMapping("/delUsers")
    public R delUsers(Integer userId) {
        int count = usersDao.delUsers(userId);
        if (count>0) {
            return R.ok();
        }
        else {
            return R.error("删除用户失败！");
        }
    }

    @RequestMapping("/updateUsers")
    public R updateUsers(User users) {
        Integer count = usersDao.updateUsers(users);
        if (count == null) {
            return R.ok();
        }
        else {
            return R.error("修改用户失败！");
        }
    }

    @RequestMapping("/updateUserAddressNum")
    public R updateUserAddressNum(Integer userId) {
        Integer count = usersDao.updateUserAddressNum(userId);
        if (count == null) {
            return R.ok();
        }
        else {
            return R.error("修改用户地址失败！");
        }
    }
    @RequestMapping("/updateUserLikeNum")
    public R updateUserLikeNum(Integer userId) {
        Integer count = usersDao.updateUserLikeNum(userId);
        if (count == null) {
            return R.ok();
        }
        else {
            return R.error("修改用户点赞失败！");
        }
    }
    @RequestMapping("/updateUserLoveNum")
    public R updateUserLoveNum(Integer userId) {
        Integer count = usersDao.updateUserLoveNum(userId);
        if (count == null) {
            return R.ok();
        }
        else {
            return R.error("修改用户收藏失败！");
        }
    }

    @RequestMapping(value = "/showAllUsers", produces = "text/json;charset=UTF-8")
    public String showAllUsers(){
        List<User> userss = usersDao.getAllUsers("");
        String usersJson = JSON.toJSONString(userss);
        return usersJson;
    }

    @ResponseBody
    @RequestMapping("/findAllUser")
    public R findAllAdmin(@RequestParam("pageIndex") int pageIndex,
                          @RequestParam("pageSize") int pageSize,
                          @RequestParam("keyWord") String keyWord){
        PageHelper.startPage(pageIndex,pageSize);
        PageInfo<User> pageInfo = new PageInfo(usersDao.getAllUsers(keyWord));
        return R.ok().put("pageInfo", pageInfo);
    }

    @RequestMapping(value = "/showUsers", produces = "text/json;charset=UTF-8")
    public String showUsers(String openid){
        User users = usersDao.getUserById(openid);
        String usersJson = JSON.toJSONString(users);
        return usersJson;
    }
}
