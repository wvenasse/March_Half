package org.example.controller;

import com.alibaba.fastjson.JSON;
import org.example.dao.UserDao;
import org.example.pojo.Result;
import org.example.pojo.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class IndexController {
    @Autowired
    UserDao userDao;
    @RequestMapping("/addUser")
    public Result addUser(User user) {
        int count = userDao.addUser(user);
        //当添加成功时，count的值为被插入的数据的行数
        Result result = new Result();
        if (count > 0) {
            result.setData("ok");
            result.setMsg("添加用户成功");
            result.setCode(200);
            return result;
        }
        else {
            result.setData("no");
            result.setMsg("添加用户失败");
            result.setCode(0);
            return result;
        }
    }

    @RequestMapping("/delUser")
    public Result delUser(String userName) {
        int count = userDao.delUser(userName);
        Result result = new Result();
        if (count > 0) {
            result.setData("ok");
            result.setMsg("删除用户成功");
            result.setCode(200);
            return result;
        }
        else {
            result.setData("no");
            result.setMsg("删除用户失败");
            result.setCode(0);
            return result;
        }
    }

    @RequestMapping("/updateUser")
    public Result updateUser(User user) {
        Integer count = userDao.updateUser(user);
        Result result = new Result();
        if (count == null) {
            result.setData("ok");
            result.setMsg("修改用户成功");
            result.setCode(200);
            return result;
        }
        else {
            result.setData("no");
            result.setMsg("修改用户失败");
            result.setCode(0);
            return result;
        }
    }

    @RequestMapping(value = "/showAllUser", produces = "text/json;charset=UTF-8")
    public Object showAllUser(){
        List<User> users = userDao.getAllUser();
        Result result = new Result();
        String userJson = JSON.toJSONString(users);
        result.setData(userJson);
        result.setMsg("加载所有用户成功");
        result.setCode(200);
        return result;
    }

    @RequestMapping("/login")
    public Object login(String userName, String password) {
        System.out.println("学号："+userName);
        System.out.println("密码："+password);
        int count = userDao.getUserByName(userName,password);
        Result result = new Result();
        if (count > 0) {
            result.setData("ok");
            result.setMsg("用户名密码正确");
            result.setCode(200);
            return result;
        }
        else {
            result.setData("no");
            result.setMsg("用户名密码错误");
            result.setCode(0);
            return result;
        }
    }

    @RequestMapping(value = "/showUser", produces = "text/json;charset=UTF-8")
    public Result showUsers(String userName){
        User user = userDao.getUserByUserName(userName);
        Result result = new Result();
        String userJson = JSON.toJSONString(user);
        result.setData(userJson);
        result.setMsg("用户名密码正确");
        result.setCode(200);
        return result;
    }
}
