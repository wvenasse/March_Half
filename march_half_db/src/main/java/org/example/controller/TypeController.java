package org.example.controller;
import com.alibaba.fastjson.JSON;
import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import org.example.dao.TypeDao;
import org.example.pojo.R;
import org.example.pojo.Type;
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
    public R addType(Type type) {
        int count = typeDao.addType(type);
        if (count > 0) {
            return R.ok();
        }
        else {
            return R.error("添加类别失败！");
        }
    }

    @RequestMapping("/delType")
    public R delType(Integer typeId) {
        int count = typeDao.delType(typeId);
        if (count > 0) {
            return R.ok();
        }
        else {
            return R.error("删除类别失败！");
        }
    }

    @RequestMapping("/updateType")
    public R updateType(Type type) {
        Integer count = typeDao.updateType(type);
        if (count == null) {
            return R.ok();
        }
        else {
            return R.error("修改类别失败！");
        }
    }

    @RequestMapping(value = "/showAllType", produces = "text/json;charset=UTF-8")
    public String showAllType(){
        List<Type> type = typeDao.getAllType("");
        String typeJson = JSON.toJSONString(type);
        return typeJson;
    }

    @ResponseBody
    @RequestMapping("/findAllType")
    public R findAllType(@RequestParam("pageIndex") int pageIndex,
                                      @RequestParam("pageSize") int pageSize,
                                      @RequestParam("keyWord") String keyWord){
        PageHelper.startPage(pageIndex,pageSize);
        PageInfo<Type> pageInfo = new PageInfo(typeDao.getAllType(keyWord));
        return R.ok().put("pageInfo", pageInfo);
    }

    @RequestMapping(value = "/showType", produces = "text/json;charset=UTF-8")
    public String showType(Integer typeId){
        Type type = typeDao.getUserByTypeId(typeId);
        String typeJson = JSON.toJSONString(type);
        return typeJson;
    }

}
