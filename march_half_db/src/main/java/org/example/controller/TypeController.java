package org.example.controller;
import com.alibaba.fastjson.JSON;
import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import org.example.dao.TypeDao;
import org.example.pojo.Type;
import org.example.pojo.Result;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class TypeController {
    @Autowired
    TypeDao typeDao;
    @RequestMapping("/addType")
    public Result addType(Type type) {
        int count = typeDao.addType(type);
        Result result = new Result();
        if (count > 0) {
            result.setData("ok");
            result.setMsg("添加类别成功");
            result.setCode(200);
            return result;
        }
        else {
            result.setData("no");
            result.setMsg("添加类别失败");
            result.setCode(0);
            return result;
        }
    }

    @RequestMapping("/delType")
    public Result delType(Integer typeId) {
        int count = typeDao.delType(typeId);
        Result result = new Result();
        if (count > 0) {
            result.setData("ok");
            result.setMsg("删除类别成功");
            result.setCode(200);
            return result;
        }
        else {
            result.setData("no");
            result.setMsg("删除类别失败");
            result.setCode(0);
            return result;
        }
    }

    @RequestMapping("/updateType")
    public Result updateType(Type type) {
        Integer count = typeDao.updateType(type);
        Result result = new Result();
        if (count == null) {
            result.setData("ok");
            result.setMsg("修改类别成功");
            result.setCode(200);
            return result;
        }
        else {
            result.setData("no");
            result.setMsg("修改类别失败");
            result.setCode(0);
            return result;
        }
    }

    @RequestMapping(value = "/showAllType", produces = "text/json;charset=UTF-8")
    public Object showAllType(String keyWord){
        List<Type> type = typeDao.getAllType(keyWord);
        String typeJson = JSON.toJSONString(type);
        return typeJson;
    }

    @ResponseBody
    @RequestMapping("/findAllType")
    public PageInfo<Type> findAllType(@RequestParam("pageIndex") int pageIndex,
                                      @RequestParam("pageSize") int pageSize,
                                      @RequestParam("keyWord") String keyWord){
        PageHelper.startPage(pageIndex,pageSize);
        PageInfo<Type> pageInfo = new PageInfo(typeDao.getAllType(keyWord));
        return pageInfo;
    }

    @RequestMapping(value = "/showType", produces = "text/json;charset=UTF-8")
    public String showType(Integer typeId){
        Type type = typeDao.getUserByTypeId(typeId);
        String typeJson = JSON.toJSONString(type);
        return typeJson;
    }

}
