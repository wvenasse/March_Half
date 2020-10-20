package org.example.controller;

import com.alibaba.fastjson.JSON;
import org.example.dao.FileDao;
import org.example.pojo.File;
import org.example.pojo.Result;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class FileController {
    //后台的用户
    @Autowired
    FileDao fileDao;
    @RequestMapping("/addFile")
    public Result addNotice(File file) {
        int count = fileDao.addFile(file);
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

    @RequestMapping("/delFile")
    public Result delFile(Integer fileId) {
        int count = fileDao.delFile(fileId);
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

    @RequestMapping("/updateFile")
    public Result updateFile(File file) {
        Integer count = fileDao.updateFile(file);
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

    @RequestMapping(value = "/showAllFile", produces = "text/json;charset=UTF-8")
    public Object showAllFile(){
        List<File> files = fileDao.getAllFile();
        String fileJson = JSON.toJSONString(files);
        return fileJson;
    }

    @RequestMapping(value = "/showFile", produces = "text/json;charset=UTF-8")
    public String showFile(Integer fileId){
        File file = fileDao.getFileByFileId(fileId);
        String fileJson = JSON.toJSONString(file);
        return fileJson;
    }
}
