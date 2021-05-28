package org.example.controller;
import com.alibaba.fastjson.JSON;
import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import org.example.dao.OrderDao;
import org.example.pojo.OrderNum;
import org.example.pojo.R;
import org.example.pojo.Order;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class OrderController {
    @Autowired
    OrderDao orderDao;

    @RequestMapping("/addOrder")
    public R addOrder(Order order) {
        int count = orderDao.addOrder(order);
        //当添加成功时，count的值为被插入的数据的行数
        System.out.println("总共插入了："+count+"条数据");
        if (count>0) {
            return R.ok();
        }
        else {
            return R.error("添加订单失败！");
        }
    }

    @RequestMapping("/delOrder")
    public R delOrder(Integer orderId) {
        int count = orderDao.delOrder(orderId);
        if (count>0) {
            return R.ok();
        }
        else {
            return R.error("删除订单失败！");
        }
    }

    @RequestMapping("/updateOrder")
    public R updateOrder(Order order) {
        Integer count = orderDao.updateOrder(order);
        if (count == null) {
            return R.ok();
        }
        else {
            return R.error("修改订单失败！");
        }
    }

    @RequestMapping("/updateOrderStatus")
    public R updateOrderStatus(Integer orderId,String orderStatus) {
        Integer count = orderDao.updateOrderStatus(orderId,orderStatus);
        if (count == null) {
            return R.ok();
        }
        else {
            return R.error("修改订单状态失败！");
        }
    }

    @RequestMapping(value = "/showOrderNum", produces = "text/json;charset=UTF-8")
    public String showOrderNum(Integer userId){
        List<OrderNum> orderNum = orderDao.getOrderNum(userId);
        String orderJson = JSON.toJSONString(orderNum);
        return orderJson;
    }

    @RequestMapping(value = "/showServiceOrderNum", produces = "text/json;charset=UTF-8")
    public String showServiceOrderNum(Integer serviceId){
        List<OrderNum> orderNum = orderDao.getServiceOrderNum(serviceId);
        String orderJson = JSON.toJSONString(orderNum);
        return orderJson;
    }

    @RequestMapping(value = "/showAllOrder", produces = "text/json;charset=UTF-8")
    public String showAllOrder(){
        List<Order> order = orderDao.getAllOrder("");
        String orderJson = JSON.toJSONString(order);
        return orderJson;
    }
    @RequestMapping(value = "/showAllOrderByUserStatus", produces = "text/json;charset=UTF-8")
    public String showAllOrderByStatus(String orderStatus,Integer userId){
        List<Order> order = orderDao.getAllOrderByUserStatus(orderStatus,userId);
        String orderJson = JSON.toJSONString(order);
        return orderJson;
    }
    @RequestMapping(value = "/showAllOrderByUser", produces = "text/json;charset=UTF-8")
    public String showAllOrderByUser(Integer userId){
        List<Order> order = orderDao.getAllOrderByUser(userId);
        String orderJson = JSON.toJSONString(order);
        return orderJson;
    }
    @RequestMapping(value = "/showAllOrderByServiceStatus", produces = "text/json;charset=UTF-8")
    public String showAllOrderByServiceStatus(String orderStatus,Integer serviceId){
        List<Order> order = orderDao.getAllOrderByServiceStatus(orderStatus,serviceId);
        String orderJson = JSON.toJSONString(order);
        return orderJson;
    }
    @RequestMapping(value = "/showAllOrderByService", produces = "text/json;charset=UTF-8")
    public String showAllOrderByService(Integer serviceId){
        List<Order> order = orderDao.getAllOrderByService(serviceId);
        String orderJson = JSON.toJSONString(order);
        return orderJson;
    }

    @ResponseBody
    @RequestMapping("/findAllOrder")
    public R findAllOrder(@RequestParam("pageIndex") int pageIndex,
                          @RequestParam("pageSize") int pageSize,
                          @RequestParam("keyWord") String keyWord){
        PageHelper.startPage(pageIndex,pageSize);
        PageInfo<Order> pageInfo = new PageInfo(orderDao.getAllOrder(keyWord));
        return R.ok().put("pageInfo", pageInfo);
    }

    @ResponseBody
    @RequestMapping("/findAllOrderByStatus")
    public R findAllOrderByStatus(@RequestParam("pageIndex") int pageIndex,
                          @RequestParam("pageSize") int pageSize,
                          @RequestParam("orderStatus") String orderStatus){
        PageHelper.startPage(pageIndex,pageSize);
        PageInfo<Order> pageInfo = new PageInfo(orderDao.getAllOrderByStatus(orderStatus));
        return R.ok().put("pageInfo", pageInfo);
    }

    @RequestMapping(value = "/showOrder", produces = "text/json;charset=UTF-8")
    public String showOrder(Integer orderId){
        Order order = orderDao.getOrderById(orderId);
        String orderJson = JSON.toJSONString(order);
        return orderJson;
    }
}
