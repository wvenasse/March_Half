package org.example.controller;
import com.alibaba.fastjson.JSON;
import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import org.example.dao.ViewDao;
import org.example.pojo.View;
import org.example.pojo.R;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class ViewController {
    @Autowired
    ViewDao viewDao;
    @RequestMapping("/addView")
    public R addView(View view) {
        int count = viewDao.addView(view);
        //当添加成功时，count的值为被插入的数据的行数
        if (count > 0) {
            return R.ok();
        }
        else {
            return R.error("添加浏览失败！");
        }
    }

    @RequestMapping("/delView")
    public R delView(Integer viewId) {
        int count = viewDao.delView(viewId);
        if (count > 0) {
            return R.ok();
        }
        else {
            return R.error("删除浏览失败！");
        }
    }

    @RequestMapping("/updateView")
    public R updateView(View view) {
        Integer count = viewDao.updateView(view);
        if (count == null) {
            return R.ok();
        }
        else {
            return R.error("修改浏览失败！");
        }
    }

    @RequestMapping(value = "/showAllView", produces = "text/json;charset=UTF-8")
    public String showAllView(@RequestParam("postId") Integer postId, @RequestParam("openid") String openid){
        List<View> views = viewDao.getAllView(postId,openid);
        String viewJson = JSON.toJSONString(views);
        return viewJson;
    }

    @ResponseBody
    @RequestMapping("/findAllView")
    public R findAllLove(@RequestParam("pageIndex") int pageIndex,
                                      @RequestParam("pageSize") int pageSize,
                         @RequestParam("postId") Integer postId, @RequestParam("openid") String openid){
        PageHelper.startPage(pageIndex,pageSize);
        PageInfo<View> pageInfo = new PageInfo(viewDao.getAllView(postId,openid));
        return R.ok().put("pageInfo", pageInfo);
    }


    @RequestMapping(value = "/showView", produces = "text/json;charset=UTF-8")
    public String showViews(Integer viewId){
        View view = viewDao.getViewById(viewId);
        String viewJson = JSON.toJSONString(view);
        return viewJson;
    }


}
