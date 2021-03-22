package org.example.controller;
import com.alibaba.fastjson.JSON;
import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import org.example.dao.FavorDao;
import org.example.pojo.Favor;
import org.example.pojo.R;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class FavorController {
    @Autowired
    FavorDao favorDao;

    @RequestMapping("/addFavor")
    public R addFavor(Favor favor) {
        int count = favorDao.addFavor(favor);
        if (count > 0) {
            return R.ok();
        }
        else {
            return R.error("添加收藏失败！");
        }
    }

    @RequestMapping("/delFavor")
    public R delFavor(Integer favorId) {
        int count = favorDao.delFavor(favorId);
        if (count > 0) {
            return R.ok();
        }
        else {
            return R.error("删除地址失败！");
        }
    }

    @RequestMapping("/updateFavor")
    public R updateFavor(Favor favor) {
        Integer count = favorDao.updateFavor(favor);
        if (count == null) {
            return R.ok();
        }
        else {
            return R.error("修改地址失败！");
        }
    }

    @RequestMapping(value = "/showAllFavor", produces = "text/json;charset=UTF-8")
    public String showAllFavor(Integer favorType,Integer userId){
        List<Favor> favor = favorDao.getAllFavor(favorType,userId);
        String favorJson = JSON.toJSONString(favor);
        return favorJson;
    }

    @ResponseBody
    @RequestMapping("/findAllFavor")
    public R findAllFavor(@RequestParam("pageIndex") int pageIndex,
                                      @RequestParam("pageSize") int pageSize,
                                      @RequestParam("pageSize")Integer favorType,
                                      @RequestParam("userId") Integer userId){
        PageHelper.startPage(pageIndex,pageSize);
        PageInfo<Favor> pageInfo = new PageInfo(favorDao.getAllFavor(favorType,userId));
        return R.ok().put("pageInfo", pageInfo);
    }

    @RequestMapping(value = "/showFavor", produces = "text/json;charset=UTF-8")
    public String showFavor(Integer favorId){
        Favor favor = favorDao.getFavorById(favorId);
        String favorJson = JSON.toJSONString(favor);
        return favorJson;
    }

    @RequestMapping(value = "/isFavorService", produces = "text/json;charset=UTF-8")
    public String isFavorService(Integer favorType,Integer userId,Integer serviceId){
        Favor favor = favorDao.isFavorService(favorType,userId,serviceId);
        String favorJson = JSON.toJSONString(favor);
        return favorJson;
    }
    @RequestMapping(value = "/isFavorInstitution", produces = "text/json;charset=UTF-8")
    public String isFavorInstitution(Integer favorType,Integer userId,Integer institutionId){
        Favor favor = favorDao.isFavorInstitution(favorType,userId,institutionId);
        String favorJson = JSON.toJSONString(favor);
        return favorJson;
    }
    @RequestMapping(value = "/isFavorPost", produces = "text/json;charset=UTF-8")
    public String isFavorPost(Integer favorType,Integer userId,Integer postId){
        Favor favor = favorDao.isFavorPost(favorType,userId,postId);
        String favorJson = JSON.toJSONString(favor);
        return favorJson;
    }

    @RequestMapping(value = "/isFavorServiceNum", produces = "text/json;charset=UTF-8")
    public String isFavorServiceNum(Integer favorType,Integer serviceId){
        List<Favor>  favor = favorDao.isFavorServiceNum(favorType,serviceId);
        String favorJson = JSON.toJSONString(favor);
        return favorJson;
    }
    @RequestMapping(value = "/isFavorInstitutionNum", produces = "text/json;charset=UTF-8")
    public String isFavorInstitutionNum(Integer favorType,Integer institutionId){
        List<Favor>  favor = favorDao.isFavorInstitutionNum(favorType,institutionId);
        String favorJson = JSON.toJSONString(favor);
        return favorJson;
    }
    @RequestMapping(value = "/isFavorPostNum", produces = "text/json;charset=UTF-8")
    public String isFavorPostNum(Integer favorType,Integer postId){
        List<Favor>  favor = favorDao.isFavorPostNum(favorType,postId);
        String favorJson = JSON.toJSONString(favor);
        return favorJson;
    }
}
