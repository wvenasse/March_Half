package org.example.controller;

import com.alibaba.fastjson.JSON;
import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import org.example.dao.NoticeDao;
import org.example.pojo.R;
import org.example.pojo.Notice;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;
import java.io.*;
import java.util.Calendar;
import java.util.List;

@RestController
public class NoticeController {
    //后台的用户
    @Autowired
    NoticeDao noticeDao;
    @RequestMapping("/addNotice")
    public R addNotice(Notice notice) {
        int count = noticeDao.addNotice(notice);
        if (count > 0) {
            return R.ok();
        }
        else {
            return R.error("添加公告失败！");
        }
    }

    @RequestMapping("/delNotice")
    public R delNotice(Integer noticeId) {
        int count = noticeDao.delNotice(noticeId);
        if (count > 0) {
            return R.ok();
        }
        else {
            return R.error("删除公告失败！");
        }
    }

    @RequestMapping("/updateNotice")
    public R updateNotice(Notice notice) {
        Integer count = noticeDao.updateNotice(notice);
        if (count == null) {
            return R.ok();
        }
        else {
            return R.error("修改公告失败！");
        }
    }

    @RequestMapping(value = "/showAllNotice", produces = "text/json;charset=UTF-8")
    public R showAllNotice(String keyWord){
        List<Notice> notices = noticeDao.getAllNotice(keyWord);
        String noticeJson = JSON.toJSONString(notices);
        return R.ok().put("noticeJson", noticeJson);
    }

    @ResponseBody
    @RequestMapping("/findAllNotice")
    public R findAllType(@RequestParam("pageIndex") int pageIndex,
                                      @RequestParam("pageSize") int pageSize,
                                      @RequestParam("keyWord") String keyWord){
        PageHelper.startPage(pageIndex,pageSize);
        PageInfo<Notice> pageInfo = new PageInfo(noticeDao.getAllNotice(keyWord));
        return R.ok().put("pageInfo", pageInfo);
    }

    @RequestMapping(value = "/showNotice", produces = "text/json;charset=UTF-8")
    public String showNotice(Integer noticeId){
        Notice notice = noticeDao.getNoticeByNoticeId(noticeId);
        String NoticeJson = JSON.toJSONString(notice);
        return NoticeJson;
    }

    @RequestMapping("/uploadPic")
    @ResponseBody
    public R uploadPic(@RequestParam(value = "image_data", required = false) MultipartFile file, HttpServletRequest request) throws IOException  {
        //目前这里是写死的本地硬盘路径

        String path = "D:/WSH/2021/March_Half/march_half_vue2/src/assets/imgs/Upload";
        //获取文件名称
        String fileName = file.getOriginalFilename();
        //获取文件名后缀
        Calendar currTime = Calendar.getInstance();
        String time = String.valueOf(currTime.get(Calendar.YEAR))+String.valueOf((currTime.get(Calendar.MONTH)+1));
        //获取文件名后缀
        String suffix = fileName.substring(file.getOriginalFilename().lastIndexOf("."));
        suffix = suffix.toLowerCase();
        if(suffix.equals(".jpg") || suffix.equals(".jpeg") || suffix.equals(".png")){
            File targetFile = new File(path, fileName);
            if(!targetFile.getParentFile().exists()){    //注意，判断父级路径是否存在
                targetFile.getParentFile().mkdirs();
            }
            long size = 0;
            //保存
            try {
                file.transferTo(targetFile);
                size = file.getSize();
            } catch (Exception e) {
                e.printStackTrace();
                return R.error("上传失败！");
            }
//          String fileUrl="D:/WSH/2021/March_Half/march_half_vue2/src/assets/imgs/Upload/";
//          fileUrl = fileUrl + request.getContextPath() + "/img/" + fileName;
            return R.ok().put("fileName", fileName);
        }else{
            return R.error("图片格式有误，请上传.jpg、.png、.jpeg格式的文件");
        }

    }

}
