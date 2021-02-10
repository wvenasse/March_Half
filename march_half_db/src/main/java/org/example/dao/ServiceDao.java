package org.example.dao;

import org.example.pojo.Service;
import org.mybatis.spring.annotation.MapperScan;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
@MapperScan
public interface ServiceDao {
    //增
    public int addService(Service service);
    //删
    public int delService(Integer serviceId);
    //改
    public Integer updateService(Service service);

    public Integer updateServiceLikeNum(Integer serviceId);
    public Integer updateServiceLoveNum(Integer serviceId);
    public Integer updateServiceOrderNum(Integer serviceId);
    public Integer updateServiceEvaNum(Integer serviceId);
    public Integer updateServiceStar(Integer serviceId);
    //查
    public List<Service> getAllService(String keyWord);
    //照id查
    public Service getServiceById(Integer serviceId);
}