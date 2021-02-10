package org.example.controller;

import com.alibaba.fastjson.JSON;
import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import org.example.dao.EvaluationDao;
import org.example.pojo.Evaluation;
import org.example.pojo.R;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class EvaluationController {
    @Autowired
    EvaluationDao evaluationDao;

    @RequestMapping("/addEvaluation")
    public R addEvaluation(Evaluation evaluation) {
        int count = evaluationDao.addEvaluation(evaluation);
        //当添加成功时，count的值为被插入的数据的行数
        System.out.println("总共插入了："+count+"条数据");
        if (count>0) {
            return R.ok();
        }
        else {
            return R.error("添加订单失败！");
        }
    }

    @RequestMapping("/delEvaluation")
    public R delEvaluation(Integer evaluationId) {
        int count = evaluationDao.delEvaluation(evaluationId);
        if (count>0) {
            return R.ok();
        }
        else {
            return R.error("删除订单失败！");
        }
    }

    @RequestMapping("/updateEvaluation")
    public R updateEvaluation(Evaluation evaluation) {
        Integer count = evaluationDao.updateEvaluation(evaluation);
        if (count == null) {
            return R.ok();
        }
        else {
            return R.error("修改订单失败！");
        }
    }

    @RequestMapping(value = "/showAllEvaluation", produces = "text/json;charset=UTF-8")
    public String showAllEvaluation(){
        List<Evaluation> evaluation = evaluationDao.getAllEvaluation();
        String evaluationJson = JSON.toJSONString(evaluation);
        return evaluationJson;
    }
    @RequestMapping(value = "/showAllEvaluationByUser", produces = "text/json;charset=UTF-8")
    public String showAllEvaluationByUser(Integer userId){
        List<Evaluation> evaluation = evaluationDao.getAllEvaluationByUser(userId);
        String evaluationJson = JSON.toJSONString(evaluation);
        return evaluationJson;
    }
    @RequestMapping(value = "/showAllEvaluationByService", produces = "text/json;charset=UTF-8")
    public String showAllEvaluationByService(Integer serviceId){
        List<Evaluation> evaluation = evaluationDao.getAllEvaluationByService(serviceId);
        String evaluationJson = JSON.toJSONString(evaluation);
        return evaluationJson;
    }
    @RequestMapping(value = "/showAllEvaluationByInstitution", produces = "text/json;charset=UTF-8")
    public String showAllEvaluationByInstitution(Integer institutionId){
        List<Evaluation> evaluation = evaluationDao.getAllEvaluationByInstitution(institutionId);
        String evaluationJson = JSON.toJSONString(evaluation);
        return evaluationJson;
    }

    @ResponseBody
    @RequestMapping("/findAllEvaluation")
    public R findAllEvaluation(@RequestParam("pageIndex") int pageIndex,
                          @RequestParam("pageSize") int pageSize){
        PageHelper.startPage(pageIndex,pageSize);
        PageInfo<Evaluation> pageInfo = new PageInfo(evaluationDao.getAllEvaluation());
        return R.ok().put("pageInfo", pageInfo);
    }

    @ResponseBody
    @RequestMapping("/findAllEvaluationByUser")
    public R findAllEvaluationByUser(@RequestParam("pageIndex") int pageIndex,
                          @RequestParam("pageSize") int pageSize,
                          @RequestParam("userId") Integer userId){
        PageHelper.startPage(pageIndex,pageSize);
        PageInfo<EvaluationDao> pageInfo = new PageInfo(evaluationDao.getAllEvaluationByUser(userId));
        return R.ok().put("pageInfo", pageInfo);
    }


    @RequestMapping(value = "/showEvaluation", produces = "text/json;charset=UTF-8")
    public String showEvaluation(Integer evaluationId){
        Evaluation evaluation = evaluationDao.getEvaluationById(evaluationId);
        String evaluationJson = JSON.toJSONString(evaluation);
        return evaluationJson;
    }
}
