package org.example.pojo;

public class Admin {
    private Integer rootId;
    private  String userName;
    private  String nickname;
    private  String password;
    private  String rootTime;

    public String getRootTime() {
        return rootTime;
    }

    public void setRootTime(String rootTime) {
        this.rootTime = rootTime;
    }

    public Integer getRootId() {
        return rootId;
    }

    public void setRootId(Integer rootId) {
        this.rootId = rootId;
    }

    public String getNickname() {
        return nickname;
    }

    public void setNickname(String nickname) {
        this.nickname = nickname;
    }

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}
