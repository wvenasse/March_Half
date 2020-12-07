package org.example.controller;

import com.alibaba.fastjson.JSON;
import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import org.example.dao.TypeDao;
import org.example.pojo.FileResult;
import org.example.pojo.Result;
import org.example.pojo.Type;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;
import java.io.File;
import java.io.IOException;
import java.util.List;

@RestController
public class UploadController {
    @Autowired
    TypeDao typeDao;
    /**
     * 文件上传
     * @param picture
     * @param request
     * @return
     */
    @RequestMapping("/upload")
    public FileResult upload(@RequestParam("picture") MultipartFile picture, HttpServletRequest request) {

        logger.info("您已进入图片上传服务");
        //获取文件在服务器的储存位置
        String path = "G://idea//test//src//main//resources//static//uploadImg";
        File filePath = new File(path);
        logger.info("文件的保存路径：" + path);
        if (!filePath.exists() && !filePath.isDirectory()) {
            logger.info("目录不存在，创建目录:" + filePath);
            filePath.mkdir();
        }

        //获取原始文件名称(包含格式)
        String originalFileName = picture.getOriginalFilename();
        logger.info("原始文件名称：" + originalFileName);

        //获取文件类型，以最后一个`.`为标识
        String type = originalFileName.substring(originalFileName.lastIndexOf(".") + 1);
        logger.info("文件类型：" + type);
        //获取文件名称（不包含格式）
        String name = originalFileName.substring(0, originalFileName.lastIndexOf("."));

        String fileName = UUIDUtils.getUUID32() + name + "." + type;
        logger.info("新文件名称：" + fileName);

        //在指定路径下创建一个文件
        File targetFile = new File(path, fileName);
        logger.info("图片地址："+path+"/"+fileName);
        //将文件保存到服务器指定位置
        try {
            picture.transferTo(targetFile);
            logger.info("上传成功");
            //将文件在服务器的存储路径返回
            return new FileResult(true,fileName,path+"/"+fileName);
        } catch (IOException e) {
            logger.info("上传失败");
            e.printStackTrace();
            return new FileResult(false, "上传失败","");
        }
    }

    @RequestMapping("/delFile")
    public String delFile(String path) {
        logger.info("进入图片删除！！");
        String resultInfo = null;
        File file = new File(path);
        logger.info("图片删除本地链接："+file);
        System.out.println(file.exists());
        if (file.exists()) {//文件是否存在
            if (file.delete()) {//存在就删了，返回1
                logger.info("图片删除成功");
                resultInfo =  "1";
            } else {
                logger.info("图片删除失败");
                resultInfo =  "0";
            }
        } else {
            resultInfo = "文件不存在！";
        }
        return resultInfo;
    }


}
