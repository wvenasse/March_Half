package org.example.dao;

import org.example.pojo.Evaluation;
import org.example.pojo.Order;
import org.example.pojo.OrderNum;
import org.mybatis.spring.annotation.MapperScan;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
@MapperScan
public interface OrderDao {
    //增
    public int addOrder(Order order);
    //删
    public int delOrder(Integer orderId);
    //改
    public Integer updateOrder(Order order);
    public Integer updateOrderStatus(Integer orderId,String orderStatus);

    //查
    public List<OrderNum> getOrderNum();
    public List<Order> getAllOrder(String keyWord);
    public List<Order> getAllOrderByUser(Integer userId);
    public List<Order> getAllOrderByStatus(String orderStatus);
    public List<Order> getAllOrderByUserStatus(String orderStatus,Integer userId);
    public List<Order> getAllOrderByService(Integer serviceId);
    public List<Order> getAllOrderByServiceStatus(String orderStatus,Integer serviceId);
    //照id查
    public Order getOrderById(Integer orderId);
}