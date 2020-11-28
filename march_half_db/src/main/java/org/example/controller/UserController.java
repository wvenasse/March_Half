package org.example.controller;
import com.alibaba.fastjson.JSON;
import org.example.dao.UserDao;
import org.example.pojo.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class UserController {
    //微信小程序的用户
    @Autowired
    UserDao usersDao;

    @RequestMapping("/addUsers")
    public String addUsers(User users) {
        int count = usersDao.addUsers(users);
        //当添加成功时，count的值为被插入的数据的行数
        System.out.println("总共插入了："+count+"条数据");
        if (count>0) {
            return "ok";
        }
        return "no";
    }

    @RequestMapping("/delUsers")
    public String delUsers(String openid) {
        int count = usersDao.delUsers(openid);
        if (count>0) {
            return "ok";
        }
        return "no";
    }

    @RequestMapping("/updateUsers")
    public String updateUsers(User users) {
        Integer count = usersDao.updateUsers(users);
        // int --> Integer
        if (count == null) {
            return "ok";
        }
        return "no";
    }

    @RequestMapping(value = "/showAllUsers", produces = "text/json;charset=UTF-8")
    public Object showAllUsers(){
        List<User> userss = usersDao.getAllUsers();
        String usersJson = JSON.toJSONString(userss);
        return usersJson;
    }

    @RequestMapping(value = "/showUsers", produces = "text/json;charset=UTF-8")
    public String showUsers(String openid){
        User users = usersDao.getUserById(openid);
        String usersJson = JSON.toJSONString(users);
        return usersJson;
    }
}
