package org.example.dao;

import org.example.pojo.View;
import org.mybatis.spring.annotation.MapperScan;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
@MapperScan
public interface ViewDao {
    //增
    public int addView(View view);
    //删
    public int delView(Integer viewId);
    //改
    public Integer updateView(View view);
    //查
    public List<View> getAllView(Integer postId, String openid);

    public View getViewById(Integer viewId);
}