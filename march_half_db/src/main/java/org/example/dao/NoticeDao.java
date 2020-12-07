package org.example.dao;

import org.example.pojo.Notice;
import org.mybatis.spring.annotation.MapperScan;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
@MapperScan
public interface NoticeDao {
    //增
    public int addNotice(Notice notice);
    //删
    public int delNotice(Integer noticeId);
    //改
    public Integer updateNotice(Notice notice);
    //查
    public List<Notice> getAllNotice(String keyWord);

    public Notice getNoticeByNoticeId(Integer noticeId);
}