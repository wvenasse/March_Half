package org.example.controller;
import com.alibaba.fastjson.JSON;
import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import org.example.dao.AdminDao;
import org.example.pojo.Admin;
import org.example.pojo.Result;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class AdminController {
    @Autowired
    AdminDao userDao;
    @RequestMapping("/addUser")
    public Result addUser(Admin user) {
        int count = userDao.addAdmin(user);
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
    public Result delUser(Integer rootId) {
        int count = userDao.delAdmin(rootId);
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
    public Result updateUser(Admin user) {
        Integer count = userDao.updateAdmin(user);
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
    public Object showAllUser(@RequestParam("keyWord") String keyWord){
        List<Admin> users = userDao.getAllAdmin(keyWord);
        String userJson = JSON.toJSONString(users);
        return userJson;
    }

    @ResponseBody
    @RequestMapping("/findAllAdmin")
    public PageInfo<Admin> findAllAdmin(@RequestParam("pageIndex") int pageIndex,
                                      @RequestParam("pageSize") int pageSize,
                                      @RequestParam("keyWord") String keyWord){
        System.out.println(pageIndex);
        System.out.println(pageSize);
        System.out.println(keyWord);
        PageHelper.startPage(pageIndex,pageSize);
        PageInfo<Admin> pageInfo = new PageInfo(userDao.getAllAdmin(keyWord));
        return pageInfo;
    }

    @RequestMapping("/login")
    public Object login( String userName, String password) {
        int count = userDao.getAdmin(userName,password);
        Result result = new Result();
        if (count > 0) {
            result.setData("ok");
            result.setMsg("用户名密码正确");
            result.setCode(200);
        }
        else {
            result.setData("no");
            result.setMsg("用户名密码错误");
            result.setCode(0);
        }
        return result;

    }

    @RequestMapping(value = "/showUser", produces = "text/json;charset=UTF-8")
    public String showUsers(String userName){
        Admin user = userDao.getAdminByName(userName);
        String userJson = JSON.toJSONString(user);
        return userJson;
    }


}
