package org.example.pojo;

public class Love {
    private Integer loveId;
    private  String openid;
    private Integer loveType;
    private  String toOpenid;
    private  Integer toPostId;
    private  Integer loveTime;

    public Integer getLoveId() {
        return loveId;
    }

    public void setLoveId(Integer loveId) {
        this.loveId = loveId;
    }

    public String getOpenid() {
        return openid;
    }

    public void setOpenid(String openid) {
        this.openid = openid;
    }

    public Integer getLoveType() {
        return loveType;
    }

    public void setLoveType(Integer loveType) {
        this.loveType = loveType;
    }

    public String getToOpenid() {
        return toOpenid;
    }

    public void setToOpenid(String toOpenid) {
        this.toOpenid = toOpenid;
    }

    public Integer getToPostId() {
        return toPostId;
    }

    public void setToPostId(Integer toPostId) {
        this.toPostId = toPostId;
    }

    public Integer getLoveTime() {
        return loveTime;
    }

    public void setLoveTime(Integer loveTime) {
        this.loveTime = loveTime;
    }
}
