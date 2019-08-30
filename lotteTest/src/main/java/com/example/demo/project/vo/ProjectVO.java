package com.example.demo.project.vo;

import java.util.List;

public class ProjectVO {
 
    private String idx;
    private String title;
    private String ownerId;
    private String ownerName;
    private String startDate;
    private String endDate;
    private String writtenId;
    private String writtenDate;
    private String updateId;
    private String udpateDate;
    private List<TaskVO> taskList;
    
    
    
	public String getOwnerName() {
		return ownerName;
	}
	public void setOwnerName(String ownerName) {
		this.ownerName = ownerName;
	}
	public List<TaskVO> getTaskList() {
		return taskList;
	}
	public void setTaskList(List<TaskVO> taskList) {
		this.taskList = taskList;
	}
	public String getIdx() {
		return idx;
	}
	public void setIdx(String idx) {
		this.idx = idx;
	}
	public String getTitle() {
		return title;
	}
	public void setTitle(String title) {
		this.title = title;
	}
	public String getOwnerId() {
		return ownerId;
	}
	public void setOwnerId(String ownerId) {
		this.ownerId = ownerId;
	}
	public String getStartDate() {
		return startDate;
	}
	public void setStartDate(String startDate) {
		this.startDate = startDate;
	}
	public String getEndDate() {
		return endDate;
	}
	public void setEndDate(String endDate) {
		this.endDate = endDate;
	}
	public String getWrittenId() {
		return writtenId;
	}
	public void setWrittenId(String writtenId) {
		this.writtenId = writtenId;
	}
	public String getWrittenDate() {
		return writtenDate;
	}
	public void setWrittenDate(String writtenDate) {
		this.writtenDate = writtenDate;
	}
	public String getUpdateId() {
		return updateId;
	}
	public void setUpdateId(String updateId) {
		this.updateId = updateId;
	}
	public String getUdpateDate() {
		return udpateDate;
	}
	public void setUdpateDate(String udpateDate) {
		this.udpateDate = udpateDate;
	}
    
    
}