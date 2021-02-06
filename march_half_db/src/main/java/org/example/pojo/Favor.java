package org.example.pojo;

public class Favor {
    private  Integer favorId;
    private  Integer userId;
    private  Integer favorType;
    private  Integer serviceId;
    private  String serviceName;
    private  Integer institutionId;
    private  String institutionName;
    private  Integer postId;
    private  String postName;
    private  String favorTime;

    public Integer getFavorId() {
        return favorId;
    }

    public void setFavorId(Integer favorId) {
        this.favorId = favorId;
    }

    public Integer getUserId() {
        return userId;
    }

    public void setUserId(Integer userId) {
        this.userId = userId;
    }

    public Integer getFavorType() {
        return favorType;
    }

    public void setFavorType(Integer favorType) {
        this.favorType = favorType;
    }

    public Integer getServiceId() {
        return serviceId;
    }

    public void setServiceId(Integer serviceId) {
        this.serviceId = serviceId;
    }

    public String getServiceName() {
        return serviceName;
    }

    public void setServiceName(String serviceName) {
        this.serviceName = serviceName;
    }

    public Integer getInstitutionId() {
        return institutionId;
    }

    public void setInstitutionId(Integer institutionId) {
        this.institutionId = institutionId;
    }

    public String getInstitutionName() {
        return institutionName;
    }

    public void setInstitutionName(String institutionName) {
        this.institutionName = institutionName;
    }

    public Integer getPostId() {
        return postId;
    }

    public void setPostId(Integer postId) {
        this.postId = postId;
    }

    public String getPostName() {
        return postName;
    }

    public void setPostName(String postName) {
        this.postName = postName;
    }

    public String getFavorTime() {
        return favorTime;
    }

    public void setFavorTime(String favorTime) {
        this.favorTime = favorTime;
    }
}
