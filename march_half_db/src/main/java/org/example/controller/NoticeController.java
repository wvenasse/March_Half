package org.example.controller;

import com.alibaba.fastjson.JSON;
import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import org.example.dao.NoticeDao;
import org.example.pojo.Result;
import org.example.pojo.Notice;
import org.example.pojo.Type;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class NoticeController {
    //后台的用户
    @Autowired
    NoticeDao noticeDao;
    @RequestMapping("/addNotice")
    public Result addNotice(Notice notice) {
        int count = noticeDao.addNotice(notice);
        Result result = new Result();
        if (count > 0) {
            result.setData("ok");
            result.setMsg("添加公告成功");
            result.setCode(200);
            return result;
        }
        else {
            result.setData("no");
            result.setMsg("添加公告失败");
            result.setCode(0);
            return result;
        }
    }

    @RequestMapping("/delNotice")
    public Result delNotice(Integer noticeId) {
        int count = noticeDao.delNotice(noticeId);
        Result result = new Result();
        if (count > 0) {
            result.setData("ok");
            result.setMsg("删除公告成功");
            result.setCode(200);
            return result;
        }
        else {
            result.setData("no");
            result.setMsg("删除公告失败");
            result.setCode(0);
            return result;
        }
    }

    @RequestMapping("/updateNotice")
    public Result updateNotice(Notice notice) {
        Integer count = noticeDao.updateNotice(notice);
        System.out.println(count);
        Result result = new Result();
        if (count == null) {
            result.setData("ok");
            result.setMsg("修改公告成功");
            result.setCode(200);
            return result;
        }
        else {
            result.setData("no");
            result.setMsg("修改公告失败");
            result.setCode(0);
            return result;
        }
    }

    @RequestMapping(value = "/showAllNotice", produces = "text/json;charset=UTF-8")
    public Object showAllNotice(String keyWord){
        List<Notice> notices = noticeDao.getAllNotice(keyWord);
        String noticeJson = JSON.toJSONString(notices);
        return noticeJson;
    }

    @ResponseBody
    @RequestMapping("/findAllNotice")
    public PageInfo<Type> findAllType(@RequestParam("pageIndex") int pageIndex,
                                      @RequestParam("pageSize") int pageSize,
                                      @RequestParam("keyWord") String keyWord){
        PageHelper.startPage(pageIndex,pageSize);
        PageInfo<Type> pageInfo = new PageInfo(noticeDao.getAllNotice(keyWord));
        return pageInfo;
    }

    @RequestMapping(value = "/showNotice", produces = "text/json;charset=UTF-8")
    public String showNotice(Integer noticeId){
        Notice notice = noticeDao.getNoticeByNoticeId(noticeId);
        String NoticeJson = JSON.toJSONString(notice);
        return NoticeJson;
    }

}
