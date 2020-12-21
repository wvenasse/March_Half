package org.example.controller;
import com.alibaba.fastjson.JSON;
import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import org.example.dao.LoveDao;
import org.example.pojo.Love;
import org.example.pojo.R;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class LoveController {
    @Autowired
    LoveDao loveDao;
    @RequestMapping("/addLove")
    public R addLove(Love love) {
        int count = loveDao.addLove(love);
        //当添加成功时，count的值为被插入的数据的行数
        if (count > 0) {
            return R.ok();
        }
        else {
            return R.error("添加关注失败！");
        }
    }

    @RequestMapping("/delLove")
    public R delLove(Integer loveId) {
        int count = loveDao.delLove(loveId);
        if (count > 0) {
            return R.ok();
        }
        else {
            return R.error("删除关注失败！");
        }
    }

    @RequestMapping("/updateLove")
    public R updateLove(Love love) {
        Integer count = loveDao.updateLove(love);
        if (count == null) {
            return R.ok();
        }
        else {
            return R.error("修改关注失败！");
        }
    }

    @RequestMapping(value = "/showAllLove", produces = "text/json;charset=UTF-8")
    public String showAllLove(@RequestParam("openid") String openid, @RequestParam("toOpenid") String toOpenid, @RequestParam("toPostId") Integer toPostId){
        List<Love> loves = loveDao.getAllLove(openid,toOpenid,toPostId);
        String loveJson = JSON.toJSONString(loves);
        return loveJson;
    }

    @ResponseBody
    @RequestMapping("/findAllLove")
    public R findAllLove(@RequestParam("pageIndex") int pageIndex,
                                      @RequestParam("pageSize") int pageSize,
                         @RequestParam("openid") String openid,@RequestParam("toOpenid") String toOpenid,@RequestParam("toPostId") Integer toPostId){
        PageHelper.startPage(pageIndex,pageSize);
        PageInfo<Love> pageInfo = new PageInfo(loveDao.getAllLove(openid,toOpenid,toPostId));
        return R.ok().put("pageInfo", pageInfo);
    }


    @RequestMapping(value = "/showLove", produces = "text/json;charset=UTF-8")
    public String showLoves(Integer loveId){
        Love love = loveDao.getLoveById(loveId);
        String loveJson = JSON.toJSONString(love);
        return loveJson;
    }


}
