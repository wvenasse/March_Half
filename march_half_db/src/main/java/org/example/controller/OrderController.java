package org.example.controller;
import com.alibaba.fastjson.JSON;
import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import org.example.dao.OrderDao;
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
    public R updateOrderStatus(Integer orderId,Integer orderStatus) {
        Integer count = orderDao.updateOrderStatus(orderId,orderStatus);
        if (count == null) {
            return R.ok();
        }
        else {
            return R.error("修改订单状态失败！");
        }
    }

    @RequestMapping(value = "/showAllOrder", produces = "text/json;charset=UTF-8")
    public String showAllOrder(){
        List<Order> order = orderDao.getAllOrder("");
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

    @RequestMapping(value = "/showOrder", produces = "text/json;charset=UTF-8")
    public String showService(Integer orderId){
        Order order = orderDao.getOrderById(orderId);
        String orderJson = JSON.toJSONString(order);
        return orderJson;
    }
}
