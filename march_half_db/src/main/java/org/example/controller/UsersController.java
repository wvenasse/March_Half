package org.example.controller;


import com.alibaba.fastjson.JSON;
import org.example.dao.UsersDao;
import org.example.pojo.Users;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class UsersController {
    @Autowired
    UsersDao usersDao;

    @RequestMapping("/showAllUsers")
    public Object showAllUsers(){
        List<Users> userss = usersDao.getAllUsers();
        String usersJson = JSON.toJSONString(userss);
        return usersJson;
    }

//    @RequestMapping("/showUsers")
//    public Users showUsers(String openid){
//        System.out.println("openid："+openid);
//        Users users = usersDao.getUserById(openid);
//        String usersJson = JSON.toJSONString(users);
//        return users;
//    }

    @RequestMapping("/addUsers")
    public String addUsers(Users users) {
        int count = usersDao.addUsers(users);
        //当添加成功时，count的值为被插入的数据的行数
        System.out.println("总共插入了："+count+"条数据");
        if (count>0) {
            return "ok";
        }
        return "no";
    }
}
