package org.example.dao;

import org.example.pojo.Order;
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
    public Integer updateOrderStatus(Integer orderId,Integer orderStatus);

    //查
    public List<Order> getAllOrder(String keyWord);
    //照id查
    public Order getOrderById(Integer orderId);
}