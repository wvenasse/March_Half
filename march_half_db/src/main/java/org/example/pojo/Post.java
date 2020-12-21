package org.example.pojo;

public class Post {
    private Integer postId;

    private  String postType;

    private  String postTitle;
    private  String postDetail;
    private  String userName;

    private  String openid;
    private  Integer postTime;

    private  Integer postLike;
    private  Integer postLove;
    private  Integer postView;
    private  Integer postComment;

    private  Integer postTop;
    private  Integer postPop;

    public Integer getPostId() {
        return postId;
    }

    public void setPostId(Integer postId) {
        this.postId = postId;
    }

    public String getPostTitle() {
        return postTitle;
    }

    public String getPostType() {return postType; }

    public void setPostType(String postType) {this.postType = postType; }

    public void setPostTitle(String postTitle) {
        this.postTitle = postTitle;
    }

    public String getPostDetail() {
        return postDetail;
    }

    public void setPostDetail(String postDetail) {
        this.postDetail = postDetail;
    }

    public String getOpenid() {
        return openid;
    }

    public void setOpenid(String openid) {
        this.openid = openid;
    }

    public String getUserName() {return userName;}

    public void setUserName(String userName) {this.userName = userName;}

    public Integer getPostTime() {
        return postTime;
    }

    public void setPostTime(Integer postTime) {
        this.postTime = postTime;
    }

    public Integer getPostLike() {
        return postLike;
    }

    public void setPostLike(Integer postLike) {
        this.postLike = postLike;
    }

    public Integer getPostLove() {
        return postLove;
    }

    public void setPostLove(Integer postLove) {
        this.postLove = postLove;
    }

    public Integer getPostView() {
        return postView;
    }

    public void setPostView(Integer postView) {
        this.postView = postView;
    }

    public Integer getPostComment() {
        return postComment;
    }

    public void setPostComment(Integer postComment) {
        this.postComment = postComment;
    }

    public Integer getPostTop() {
        return postTop;
    }

    public void setPostTop(Integer postTop) {
        this.postTop = postTop;
    }

    public Integer getPostPop() {
        return postPop;
    }

    public void setPostPop(Integer postPop) {
        this.postPop = postPop;
    }
}
