package org.example.controller;
import com.alibaba.fastjson.JSON;
import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import org.example.dao.AddressDao;
import org.example.pojo.Address;
import org.example.pojo.R;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class AddressController {
    @Autowired
    AddressDao addressDao;

    @RequestMapping("/addAddress")
    public R addAddress(Address address) {
        int count = addressDao.addAddress(address);
        if (count > 0) {
            return R.ok();
        }
        else {
            return R.error("添加地址失败！");
        }
    }

    @RequestMapping("/delAddress")
    public R delAddress(Integer typeId) {
        int count = addressDao.delAddress(typeId);
        if (count > 0) {
            return R.ok();
        }
        else {
            return R.error("删除地址失败！");
        }
    }

    @RequestMapping("/updateAddress")
    public R updateAddress(Address address) {
        Integer count = addressDao.updateAddress(address);
        if (count == null) {
            return R.ok();
        }
        else {
            return R.error("修改地址失败！");
        }
    }

    @RequestMapping(value = "/showAllAddress", produces = "text/json;charset=UTF-8")
    public String showAllAddress(Integer userId){
        List<Address> address = addressDao.getAllAddress(userId);
        String addressJson = JSON.toJSONString(address);
        return addressJson;
    }

    @RequestMapping(value = "/showAddress", produces = "text/json;charset=UTF-8")
    public String showAddress(Integer addressId){
        Address address = addressDao.getAddressById(addressId);
        String addressJson = JSON.toJSONString(address);
        return addressJson;
    }

    @ResponseBody
    @RequestMapping("/findAllAddress")
    public R findAllAddress(@RequestParam("pageIndex") int pageIndex,
                                      @RequestParam("pageSize") int pageSize,
                                      @RequestParam("addressId") Integer userId){
        PageHelper.startPage(pageIndex,pageSize);
        PageInfo<Address> pageInfo = new PageInfo(addressDao.getAllAddress(userId));
        return R.ok().put("pageInfo", pageInfo);
    }


}
