package org.example.dao;

import org.example.pojo.Address;
import org.mybatis.spring.annotation.MapperScan;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
@MapperScan
public interface AddressDao {
    //增
    public int addAddress(Address address);
    //删
    public int delAddress(Integer addressId);
    //改
    public Integer updateAddress(Address address);
    //查
    public List<Address> getAllAddress(Integer userId);

    public Address getAddressById(Integer addressId);

}