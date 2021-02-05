package org.example;

import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Configuration;

@SpringBootApplication(scanBasePackages = {"org.example.controller"})
@MapperScan("org.example.dao")
@Configuration("org.example.config")
public class mainclass {
    public static void main(String[] args) throws Exception {
        System.out.println("启动成功！");
        SpringApplication.run(mainclass.class, args);
    }

}
