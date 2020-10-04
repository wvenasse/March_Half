package org.example.pojo;

public class Users {
    private Integer id;
    private  String openid;
    private  String userId;
    private  String userName;
    private  String userDorm;
    private  String userRoom;
    private  String userBed;
    private Integer userType;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getOpenid() {
        return openid;
    }

    public void setOpenid(String openid) {
        this.openid = openid;
    }

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public String getUserDorm() {
        return userDorm;
    }

    public void setUserDorm(String userDorm) {
        this.userDorm = userDorm;
    }

    public String getUserRoom() {
        return userRoom;
    }

    public void setUserRoom(String userRoom) {
        this.userRoom = userRoom;
    }

    public String getUserBed() {
        return userBed;
    }

    public void setUserBed(String userBed) {
        this.userBed = userBed;
    }

    public Integer getUserType() {
        return userType;
    }

    public void setUserType(Integer userType) {
        this.userType = userType;
    }
}
