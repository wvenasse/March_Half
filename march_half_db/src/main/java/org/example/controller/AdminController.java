package org.example.controller;
import com.alibaba.fastjson.JSON;
import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import org.example.dao.AdminDao;
import org.example.pojo.Admin;
import org.example.pojo.R;
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
    public R addUser(Admin user) {
        int count = userDao.addAdmin(user);
        //当添加成功时，count的值为被插入的数据的行数
        if (count > 0) {
            return R.ok();
        }
        else {
            return R.error("添加用户失败！");
        }
    }

    @RequestMapping("/delUser")
    public R delUser(Integer rootId) {
        int count = userDao.delAdmin(rootId);
        if (count > 0) {
            return R.ok();
        }
        else {
            return R.error("删除用户失败！");
        }
    }

    @RequestMapping("/updateUser")
    public R updateUser(Admin user) {
        Integer count = userDao.updateAdmin(user);
        if (count == null) {
            return R.ok();
        }
        else {
            return R.error("修改用户失败！");
        }
    }

    @RequestMapping(value = "/showAllUser", produces = "text/json;charset=UTF-8")
    public R showAllUser(@RequestParam("keyWord") String keyWord){
        List<Admin> users = userDao.getAllAdmin(keyWord);
        String userJson = JSON.toJSONString(users);
        return R.ok().put("userJson", userJson);
    }

    @ResponseBody
    @RequestMapping("/findAllAdmin")
    public R findAllAdmin(@RequestParam("pageIndex") int pageIndex,
                                      @RequestParam("pageSize") int pageSize,
                                      @RequestParam("keyWord") String keyWord){
        PageHelper.startPage(pageIndex,pageSize);
        PageInfo<Admin> pageInfo = new PageInfo(userDao.getAllAdmin(keyWord));
        return R.ok().put("pageInfo", pageInfo);
//        return pageInfo;PageInfo<Admin>
    }

    @RequestMapping("/login")
    public R login( String userName, String password) {
        int count = userDao.getAdmin(userName,password);
        if (count > 0) {
            return R.ok();
        }
        else {
            return R.error("用户名密码错误！");
        }
    }

    @RequestMapping(value = "/showUser", produces = "text/json;charset=UTF-8")
    public String showUsers(String userName){
        Admin user = userDao.getAdminByName(userName);
        String userJson = JSON.toJSONString(user);
        return userJson;
    }


}
