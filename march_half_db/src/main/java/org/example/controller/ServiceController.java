package org.example.controller;
import com.alibaba.fastjson.JSON;
import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import org.example.dao.ServiceDao;
import org.example.pojo.R;
import org.example.pojo.Service;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class ServiceController {
    @Autowired
    ServiceDao serviceDao;

    @RequestMapping("/addService")
    public R addService(Service service) {
        int count = serviceDao.addService(service);
        //当添加成功时，count的值为被插入的数据的行数
        System.out.println("总共插入了："+count+"条数据");
        if (count>0) {
            return R.ok();
        }
        else {
            return R.error("添加用户失败！");
        }
    }

    @RequestMapping("/delService")
    public R delService(Integer serviceId) {
        int count = serviceDao.delService(serviceId);
        if (count>0) {
            return R.ok();
        }
        else {
            return R.error("删除用户失败！");
        }
    }

    @RequestMapping("/updateService")
    public R updateService(Service service) {
        Integer count = serviceDao.updateService(service);
        if (count == null) {
            return R.ok();
        }
        else {
            return R.error("修改用户失败！");
        }
    }
    @RequestMapping("/updateServiceWeChat")
    public R updateServiceWeChat(Integer serviceId,String serviceWeChat) {
        Integer count = serviceDao.updateServiceWeChat(serviceId, serviceWeChat);
        if (count == null) {
            return R.ok();
        }
        else {
            return R.error("修改用户微信失败！");
        }
    }
    @RequestMapping("/updateServiceLikeNum")
    public R updateServiceLikeNum(Integer serviceId) {
        Integer count = serviceDao.updateServiceLikeNum(serviceId);
        if (count == null) {
            return R.ok();
        }
        else {
            return R.error("修改用户点赞失败！");
        }
    }
    @RequestMapping("/updateServiceLoveNum")
    public R updateServiceLoveNum(Integer serviceId) {
        Integer count = serviceDao.updateServiceLoveNum(serviceId);
        if (count == null) {
            return R.ok();
        }
        else {
            return R.error("修改用户收藏失败！");
        }
    }
    @RequestMapping("/updateServiceOrderNum")
    public R updateServiceOrderNum(Integer serviceId) {
        Integer count = serviceDao.updateServiceOrderNum(serviceId);
        if (count == null) {
            return R.ok();
        }
        else {
            return R.error("修改用户订单失败！");
        }
    }
    @RequestMapping("/updateServiceEvaNum")
    public R updateServiceEvaNum(Integer serviceId) {
        Integer count = serviceDao.updateServiceEvaNum(serviceId);
        if (count == null) {
            return R.ok();
        }
        else {
            return R.error("修改用户评价失败！");
        }
    }
    @RequestMapping("/updateServiceStar")
    public R updateServiceStar(Integer serviceId) {
        Integer count = serviceDao.updateServiceStar(serviceId);
        if (count == null) {
            return R.ok();
        }
        else {
            return R.error("修改用户星级失败！");
        }
    }

    @RequestMapping(value = "/showAllService", produces = "text/json;charset=UTF-8")
    public String showAllService(){
        List<Service> service = serviceDao.getAllService("");
        String serviceJson = JSON.toJSONString(service);
        return serviceJson;
    }

    @RequestMapping(value = "/showAllGoodService", produces = "text/json;charset=UTF-8")
    public String showAllGoodService(){
        List<Service> service = serviceDao.getAllGoodService();
        String serviceJson = JSON.toJSONString(service);
        return serviceJson;
    }

    @RequestMapping(value = "/showAllServiceByType", produces = "text/json;charset=UTF-8")
    public String showAllServiceByType(Integer typeId, Integer isPrice, Integer isOrder){
        boolean b1 = isPrice==1;
        boolean b2 = isOrder==1;
        if (b1 && !b2) {
            List<Service> service = serviceDao.getAllServiceByTypePrice(typeId);
            String serviceJson = JSON.toJSONString(service);
            return serviceJson;
        }
        if (b2 && !b1) {
            List<Service> service = serviceDao.getAllServiceByTypeOrder(typeId);
            String serviceJson = JSON.toJSONString(service);
            return serviceJson;
        }
        if (!b2 && !b1) {
            List<Service> service = serviceDao.getAllServiceByType(typeId);
            String serviceJson = JSON.toJSONString(service);
            return serviceJson;
        }
//        getAllServiceByTypeIns,Integer institutionId
        return "error";
    }


    @ResponseBody
    @RequestMapping("/findAllService")
    public R findAllService(@RequestParam("pageIndex") int pageIndex,
                          @RequestParam("pageSize") int pageSize,
                          @RequestParam("keyWord") String keyWord){
        PageHelper.startPage(pageIndex,pageSize);
        PageInfo<Service> pageInfo = new PageInfo(serviceDao.getAllService(keyWord));
        return R.ok().put("pageInfo", pageInfo);
    }

    @RequestMapping(value = "/showService", produces = "text/json;charset=UTF-8")
    public String showService(Integer serviceId){
        Service service = serviceDao.getServiceById(serviceId);
        String serviceJson = JSON.toJSONString(service);
        return serviceJson;
    }
    @RequestMapping(value = "/showServiceByOpenId", produces = "text/json;charset=UTF-8")
    public String showServiceByOpenId(String serviceWeChat){
        Service service = serviceDao.getServiceByOpenId(serviceWeChat);
        String serviceJson = JSON.toJSONString(service);
        return serviceJson;
    }
}
