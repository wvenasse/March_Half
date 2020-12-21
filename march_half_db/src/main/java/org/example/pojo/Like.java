package org.example.pojo;

public class Like {
    private Integer likeId;
    private Integer postId;
    private  String openid;
    private  Integer likeTime;

    public Integer getLikeId() {
        return likeId;
    }

    public void setLikeId(Integer likeId) {
        this.likeId = likeId;
    }

    public Integer getPostId() {
        return postId;
    }

    public void setPostId(Integer postId) {
        this.postId = postId;
    }

    public String getOpenid() {
        return openid;
    }

    public void setOpenid(String openid) {
        this.openid = openid;
    }

    public Integer getLikeTime() {
        return likeTime;
    }

    public void setLikeTime(Integer likeTime) {
        this.likeTime = likeTime;
    }
}
