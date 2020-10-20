package org.example.dao;

import org.example.pojo.File;
import org.mybatis.spring.annotation.MapperScan;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
@MapperScan
public interface FileDao {
    //增
    public int addFile(File file);
    //删
    public int delFile(Integer fileId);
    //改
    public Integer updateFile(File file);
    //查
    public List<File> getAllFile();

    public File getFileByFileId(Integer fileId);
}