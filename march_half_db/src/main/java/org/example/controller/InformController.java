package org.example.controller;

import com.alibaba.fastjson.JSON;
import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import org.example.dao.InformDao;
import org.example.pojo.Inform;
import org.example.pojo.R;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
public class InformController {
    @Autowired
    InformDao informDao;
    @RequestMapping("/addInform")
    public R addInform(Inform inform) {
        int count = informDao.addInform(inform);
        if (count > 0) {
            return R.ok();
        }
        else {
            return R.error("添加通知失败！");
        }
    }

    @RequestMapping("/delInform")
    public R delInform(Integer informId) {
        int count = informDao.delInform(informId);
        if (count > 0) {
            return R.ok();
        }
        else {
            return R.error("删除通知失败！");
        }
    }

    @RequestMapping("/updateInform")
    public R updateInform(Inform inform) {
        Integer count = informDao.updateInform(inform);
        if (count == null) {
            return R.ok();
        }
        else {
            return R.error("修改通知失败！");
        }
    }

    @RequestMapping(value = "/showAllInform", produces = "text/json;charset=UTF-8")
    public String showAllInform(){
        List<Inform> informs = informDao.getAllInform("");
        String informJson = JSON.toJSONString(informs);
        return informJson;
    }

    @ResponseBody
    @RequestMapping("/findAllInform")
    public R findAllInform(@RequestParam("pageIndex") int pageIndex,
                                      @RequestParam("pageSize") int pageSize,
                                      @RequestParam("keyWord") String keyWord){
        PageHelper.startPage(pageIndex,pageSize);
        PageInfo<Inform> pageInfo = new PageInfo(informDao.getAllInform(keyWord));
        return R.ok().put("pageInfo", pageInfo);
    }

    @RequestMapping(value = "/showInform", produces = "text/json;charset=UTF-8")
    public String showInform(Integer informId){
        Inform notice = informDao.getInformById(informId);
        String NoticeJson = JSON.toJSONString(notice);
        return NoticeJson;
    }

}
