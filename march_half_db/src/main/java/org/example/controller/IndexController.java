package org.example.controller;

import org.example.dao.UserDao;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class IndexController {
    @Autowired
    UserDao userDao;

    @RequestMapping("/login")
    public String index(String userId,String password) {
        System.out.println("学号："+userId);
        System.out.println("密码："+password);
        int count = userDao.getUserByLoginId(userId,password);
        if (count > 0) {
            return "ok";
        }
        return "no";
    }
}
