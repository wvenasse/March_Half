package org.example.controller;
import com.alibaba.fastjson.JSON;
import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import org.example.dao.InstitutionDao;
import org.example.pojo.R;
import org.example.pojo.Institution;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class InstitutionController {
    @Autowired
    InstitutionDao institutionDao;

    @RequestMapping("/addInstitution")
    public R addInstitution(Institution institution) {
        int count = institutionDao.addInstitution(institution);
        //当添加成功时，count的值为被插入的数据的行数
        System.out.println("总共插入了："+count+"条数据");
        if (count>0) {
            return R.ok();
        }
        else {
            return R.error("添加机构失败！");
        }
    }

    @RequestMapping("/delInstitution")
    public R delInstitution(Integer institutionId) {
        int count = institutionDao.delInstitution(institutionId);
        if (count>0) {
            return R.ok();
        }
        else {
            return R.error("删除机构失败！");
        }
    }

    @RequestMapping("/updateInstitution")
    public R updateInstitution(Institution institution) {
        Integer count = institutionDao.updateInstitution(institution);
        if (count == null) {
            return R.ok();
        }
        else {
            return R.error("修改机构失败！");
        }
    }
    @RequestMapping("/updateInstitutionServiceNum")
    public R updateInstitutionServiceNum(Integer institutionId) {
        Integer count = institutionDao.updateInstitutionServiceNum(institutionId);
        if (count == null) {
            return R.ok();
        }
        else {
            return R.error("修改机构人员失败！");
        }
    }
    @RequestMapping("/updateInstitutionLikeNum")
    public R updateInstitutionLikeNum(Integer institutionId) {
        Integer count = institutionDao.updateInstitutionLikeNum(institutionId);
        if (count == null) {
            return R.ok();
        }
        else {
            return R.error("修改机构点赞失败！");
        }
    }
    @RequestMapping("/updateInstitutionLoveNum")
    public R updateInstitutionLoveNum(Integer institutionId) {
        Integer count = institutionDao.updateInstitutionLoveNum(institutionId);
        if (count == null) {
            return R.ok();
        }
        else {
            return R.error("修改机构收藏失败！");
        }
    }
    @RequestMapping("/updateInstitutionOrderNum")
    public R updateInstitutionOrderNum(Integer institutionId) {
        Integer count = institutionDao.updateInstitutionOrderNum(institutionId);
        if (count == null) {
            return R.ok();
        }
        else {
            return R.error("修改机构订单失败！");
        }
    }

    @RequestMapping(value = "/showAllInstitution", produces = "text/json;charset=UTF-8")
    public String showAllInstitution(){
        List<Institution> institution = institutionDao.getAllInstitution("");
        String institutionJson = JSON.toJSONString(institution);
        return institutionJson;
    }

    @ResponseBody
    @RequestMapping("/findAllInstitution")
    public R findAllService(@RequestParam("pageIndex") int pageIndex,
                          @RequestParam("pageSize") int pageSize,
                          @RequestParam("keyWord") String keyWord){
        PageHelper.startPage(pageIndex,pageSize);
        PageInfo<Institution> pageInfo = new PageInfo(institutionDao.getAllInstitution(keyWord));
        return R.ok().put("pageInfo", pageInfo);
    }

    @RequestMapping(value = "/getInstitutionById", produces = "text/json;charset=UTF-8")
    public String getInstitutionById(Integer institutionId){
        Institution institution = institutionDao.getInstitutionById(institutionId);
        String institutionJson = JSON.toJSONString(institution);
        return institutionJson;
    }
}
