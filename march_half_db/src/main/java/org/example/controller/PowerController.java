package org.example.controller;
import com.alibaba.fastjson.JSON;
import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import org.example.dao.PowerDao;
import org.example.pojo.R;
import org.example.pojo.Power;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class PowerController {
    @Autowired
    PowerDao powerDao;
    @RequestMapping("/addPower")
    public R addPower(Power power) {
        int count = powerDao.addPower(power);
        if (count > 0) {
            return R.ok();
        }
        else {
            return R.error("添加权限失败！");
        }
    }

    @RequestMapping("/delPower")
    public R delPower(Integer powerId) {
        int count = powerDao.delPower(powerId);
        if (count > 0) {
            return R.ok();
        }
        else {
            return R.error("删除权限失败！");
        }
    }

    @RequestMapping("/updatePower")
    public R updatePower(Power power) {
        Integer count = powerDao.updatePower(power);
        if (count == null) {
            return R.ok();
        }
        else {
            return R.error("修改权限失败！");
        }
    }

    @RequestMapping(value = "/showAllPower", produces = "text/json;charset=UTF-8")
    public String showAllPower(){
        List<Power> power = powerDao.getAllPower("");
        String powerJson = JSON.toJSONString(power);
        return powerJson;
    }

    @ResponseBody
    @RequestMapping("/findAllPower")
    public R findAllPower(@RequestParam("pageIndex") int pageIndex,
                                      @RequestParam("pageSize") int pageSize,
                                      @RequestParam("keyWord") String keyWord){
        PageHelper.startPage(pageIndex,pageSize);
        PageInfo<Power> pageInfo = new PageInfo(powerDao.getAllPower(keyWord));
        return R.ok().put("pageInfo", pageInfo);
    }

    @RequestMapping(value = "/showPower", produces = "text/json;charset=UTF-8")
    public String showPower(Integer powerId){
        Power power = powerDao.getPower(powerId);
        String powerJson = JSON.toJSONString(power);
        return powerJson;
    }

}
